<script setup lang="ts">
import { ref } from 'vue';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from 'file-saver';
import { convert } from 'number-to-words-ru'

// Референсы для хранения данных из формы
const accountNumber = ref('');
const accountDate = ref('');
const organisationName = ref('');
const organisationDept = ref('тендерный');
const totalWithoutNds = ref('');
const ndsSum = ref('');
const totalWithNds = ref(0);
const paymentConditions = ref('');
const deliveryConditions = ref('');
const deliveryTime = ref(90);

const positions = ref([])

// Референс для хранения загруженного файла
const fileData = ref<ArrayBuffer | null>(null);

// Функция обработки загрузки файла
const handleFileUpload = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      fileData.value = reader.result as ArrayBuffer;
    };

    reader.readAsArrayBuffer(file);
  }
};


const convertNumberToWordsRu = ref({
  currency: 'rub',
  declension: 'nominative',
  roundNumber: -1,
  convertMinusSignToWord: true,
  showNumberParts: {
    integer: true,
    fractional: true,
  },
  convertNumberToWords: {
    integer: true,
    fractional: false,
  },
  showCurrency: {
    integer: true,
    fractional: true,
  },
})

// Функция для генерации документа
const generateDocument = () => {
  if (!fileData.value) {
    console.error('Шаблон не загружен');
    return;
  }

  totalWithNds.value = Number(totalWithoutNds.value) + Number(ndsSum.value)

  const zip = new PizZip(fileData.value);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  const templateData = {
    accountNumber: accountNumber.value,
    accountDate: accountDate.value,
    organisationName: organisationName.value,
    organisationDept: organisationDept.value,
    totalWithoutNds: totalWithoutNds.value,
    ndsSum: ndsSum.value,
    totalWithNds: totalWithNds.value,
    totalWithNdsLetters: convert(totalWithNds.value),
    paymentConditions: paymentConditions.value,
    deliveryConditions: deliveryConditions.value,
    deliveryTime: deliveryTime.value
  };

  console.log(totalWithNds.value)

  doc.setData(templateData);

  try {
    doc.render();
  } catch (error) {
    console.error('Ошибка при рендеринге шаблона', error);
    throw error;
  }

  const generatedDocBuffer = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  const fileName = `ТКП_от_${accountDate.value}.docx`;

  saveAs(generatedDocBuffer, fileName);
};

const addPositionRow = () => {
  const newPosition = {
    name: '',
    characteristics: '',
    productOffer: '',
    unit: 'шт',
    quantity: 0,
    priceWithoutNds: 0,
    sumWithOutNds: 0,
  }
  positions.value.push(newPosition)
}

const removePositionRow = (item: any) => {
  const index = positions.value.indexOf(item)
  if (index !== -1) {
    positions.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <h1>DocsRelease</h1>

    <input type="file" @change="handleFileUpload" />

    <div class="fields-group fields-group__header">
      <div class="fields-group fields-group__number-date">
        <div class="field">
          <label>№ КП</label>
          <input v-model="accountNumber" type="text" />
        </div>
        <div class="field">
          <label>Дата формирования</label>
          <input v-model="accountDate" type="date" />
        </div>
      </div>
      <div class="fields-group fields-group__org">
        <div class="field">
          <label>Отдел</label>
          <input v-model="organisationDept" type="text" />
        </div>
        <div class="field">
          <label>Заказчик</label>
          <input v-model="organisationName" type="text" />
        </div>
      </div>
    </div>

    <div class="table">
      <div class="table__header">
        <div class="table-header-cell">№ п/п</div>
        <div class="table-header-cell">Наименование<br>(Требование)</div>
        <div class="table-header-cell">Требуемые<br>характеристики</div>
        <div class="table-header-cell">Предложение<br>участника (выделить аналоги)</div>
        <div class="table-header-cell">Ед.<br>измер.</div>
        <div class="table-header-cell">Кол-во</div>
        <div class="table-header-cell">Цена за единицу,<br>без НДС</div>
        <div class="table-header-cell">Стоимость без НДС</div>
      </div>

      <div class="table__row" v-for="(position, index) in positions" :key="index">
        <div class="table-cell">{{ index+1 }}</div>
        <div class="table-cell">
          <input class="table-cell-input" type="text" v-model="position.name">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="text" v-model="position.characteristics">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="text" v-model="position.productOffer">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="text" v-model="position.unit">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="number" v-model="position.quantity">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="number" v-model="position.priceWithoutNds">
        </div>
        <div class="table-cell">
          <input class="table-cell-input" type="number" v-model="position.sumWithOutNds">
        </div>
      </div>
    </div>

    <button class="buttons__btn" @click="addPositionRow">Добавить позицию</button>


    <div class="fields-group fields-group__price">
      <div class="field">
        <label>Всего без НДС</label>
        <input v-model="totalWithoutNds" type="number" placeholder="12345.12"/>
      </div>

      <div class="field">
        <label>Всего НДС</label>
        <input v-model="ndsSum" type="number" placeholder="12345.12"/>
      </div>
    </div>

    <div class="fields-group fields-group__footer">
      <div class="field">
        <label>Условия оплаты</label>
        <textarea v-model="paymentConditions"></textarea>
      </div>

      <div class="field">
        <label>Условия доставки</label>
        <textarea v-model="deliveryConditions"></textarea>
      </div>

      <div class="field">
        <label>Срок предложения (календарных дней)</label>
        <input v-model="deliveryTime" type="number" />
      </div>

      <button @click="generateDocument">Сгенерировать документ</button>
    </div>
  </div>
</template>

<style scoped lang="sass">
.table
  border: 1px solid black
  max-height: 600px
.table__header
  display: grid
  grid-template-columns: 3% 20% 20% 20% 7% 7% 11.5% 11.5%
  border-bottom: 1px solid black
  margin-bottom: 10px
.table__row
  display: grid
  grid-template-columns: 3% 20% 20% 20% 7% 7% 11.5% 11.5%
  height: 20px
.table-cell
  height: 100%
  width: 100%
  border: 1px solid black
.table-cell-input
  height: 100%
  width: 100%
  border-radius: 0
  border: none

.field
  margin: 3px 0 3px 0

label
  text-align: start

input[type="date"], input[type="number"]
  width: fit-content

.fields-group
  margin: 10px 0 10px 0
  align-items: start
  width: 50%
  display: grid
  grid-template-rows: 1fr

.fields-group__header
  width: 100%
  display: grid
  grid-template-columns: 1fr 1fr

.fields-group__number-date
  width: 80%
  align-items: start

  .field
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 2fr

.fields-group__org
  width: 80%
  align-items: end

  .field
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 2fr

.fields-group__price
  align-items: end

  .field
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 1.5fr
.fields-group__footer
  align-items: start

  .field
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 1.5fr
</style>
