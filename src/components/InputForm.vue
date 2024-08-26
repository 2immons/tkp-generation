<script setup lang="ts">
import { ref } from 'vue';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from 'file-saver';
import { convert } from 'number-to-words-ru'

interface Position {
  name: string,
  characteristics: string,
  productOffer: string,
  productOfferIsAnalog: boolean,
  unit: string,
  quantity: number,
  priceWithoutNds: number,
  sumWithOutNds: number,
}

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

const positions = ref<Position[]>([
  {
    name: '',
    characteristics: '',
    productOffer: '',
    productOfferIsAnalog: false,
    unit: 'шт',
    quantity: 0,
    priceWithoutNds: 0,
    sumWithOutNds: 0,
  }
]);

const fileName = ref('Файл не выбран')

// Референс для хранения загруженного файла
const fileData = ref<ArrayBuffer | null>(null);

// Функция обработки загрузки файла
const handleFileUpload = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  if (file) {
    fileName.value = file.name
    const reader = new FileReader();

    reader.onload = () => {
      fileData.value = reader.result as ArrayBuffer;
    };

    reader.readAsArrayBuffer(file);
  }
};

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
    productOfferIsAnalog: false,
    unit: 'шт',
    quantity: 0,
    priceWithoutNds: 0,
    sumWithOutNds: 0,
  } as Position
  positions.value.push(newPosition)
}

const removePositionRow = (item: Position) => {
  const index = positions.value.indexOf(item)
  if (index !== -1) {
    positions.value.splice(index, 1)
  }
}
</script>

<template>
  <div>
    <h1>DocsRelease</h1>

    <div class="file">
      <input class="file-input" type="file" id="actual-btn" hidden @change="handleFileUpload"/>
      <label class="file-label" for="actual-btn">Выберите файл</label>
      <span id="file-chosen">{{ fileName }}</span>
    </div>

    <div class="input-group input-group__header">
      <div class="input-group input-group__number-date">
        <div class="input-wrapper">
          <label>№ КП</label>
          <input v-model="accountNumber" type="text" />
        </div>
        <div class="input-wrapper">
          <label>Дата формирования</label>
          <input v-model="accountDate" type="date" />
        </div>
      </div>
      <div class="input-group input-group__org">
        <div class="input-wrapper">
          <label>Отдел</label>
          <input v-model="organisationDept" type="text" />
        </div>
        <div class="input-wrapper">
          <label>Заказчик</label>
          <input v-model="organisationName" type="text"/>
        </div>
      </div>
    </div>

    <div class="table">
      <div class="table__header">
        <div class="header-cell">№ п/п</div>
        <div class="header-cell">Наименование<br>(Требование)</div>
        <div class="header-cell">Требуемые<br>характеристики</div>
        <div class="header-cell">Предложение участника<br>(выделить аналоги)</div>
        <div class="header-cell">Ед.<br>измер.</div>
        <div class="header-cell">Кол-во</div>
        <div class="header-cell">Цена за единицу,<br>без НДС</div>
        <div class="header-cell">Стоимость без НДС</div>
        <div class="header-cell"></div>
      </div>

      <div class="table__row" v-for="(position, index) in positions" :key="index">
        <div class="cell">{{ index + 1 }}</div>
        <div class="cell">
          <input class="cell__input" type="text" v-model="position.name">
        </div>
        <div class="cell">
          <textarea class="cell__textarea" v-model="position.characteristics"></textarea>
        </div>
        <div class="cell cell--checkbox">
          <textarea class="cell__textarea" v-model="position.productOffer"></textarea>
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="position.productOfferIsAnalog">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="cell">
          <input class="cell__input" type="text" v-model="position.unit">
        </div>
        <div class="cell">
          <input class="cell__input" type="number" v-model="position.quantity">
        </div>
        <div class="cell">
          <input class="cell__input" type="number" v-model="position.priceWithoutNds">
        </div>
        <div class="cell">
          <input class="cell__input" type="number" v-model="position.sumWithOutNds">
        </div>
        <div class="cell">
          <button class="btn__remove" @click="removePositionRow(position)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6.17647H20M9 3H15M10 16.7647V10.4118M14 16.7647V10.4118M15.5 21H8.5C7.39543 21 6.5 20.0519 6.5 18.8824L6.0434 7.27937C6.01973 6.67783 6.47392 6.17647 7.04253 6.17647H16.9575C17.5261 6.17647 17.9803 6.67783 17.9566 7.27937L17.5 18.8824C17.5 20.0519 16.6046 21 15.5 21Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <button class="btn btn__add-position" @click="addPositionRow">Добавить позицию</button>

    <div class="input-group input-group__price">
      <div class="input-wrapper">
        <label>Всего без НДС</label>
        <input v-model="totalWithoutNds" type="number" placeholder="12345.12"/>
      </div>

      <div class="input-wrapper">
        <label>Всего НДС</label>
        <input v-model="ndsSum" type="number" placeholder="12345.12"/>
      </div>
    </div>

    <div class="input-group fields-group__footer">
      <div class="input-wrapper">
        <label>Условия оплаты</label>
        <textarea v-model="paymentConditions"></textarea>
      </div>

      <div class="input-wrapper">
        <label>Условия доставки</label>
        <textarea v-model="deliveryConditions"></textarea>
      </div>

      <div class="input-wrapper">
        <label>Срок предложения (календарных дней)</label>
        <input v-model="deliveryTime" type="number" />
      </div>
    </div>

    <button class="btn btn__generate" @click="generateDocument">Сгенерировать документ</button>
  </div>
</template>

<style scoped lang="sass">
.table
  border: 1px solid black
  max-height: 600px
  overflow-y: scroll
  overflow-x: hidden
  margin: 10px 0 10px 0
.header-cell
  border: 1px solid black
  padding: 4px 0 4px 0
  resize: both
.table__header
  display: grid
  grid-template-columns: 2% 20% 20% 20% 7% 7% 10% 10% 4%
  border-bottom: 1px solid black
  background: #c9c9c9
  color: black
.table__row
  display: grid
  grid-template-columns: 2% 20% 20% 20% 7% 7% 10% 10% 4%
.cell
  display: flex
  align-items: center
  height: 100%
  min-height: 50px
  width: 100%
  border: 1px solid black
.cell__input
  height: 100%
  width: 100%
  border-radius: 0
  border: none
  text-overflow: ellipsis

.cell--checkbox
  display: flex
  padding-right: 3px
  gap: 3px

textarea
  min-height: 50px
  max-height: 200px
  resize: vertical
  width: 100%
  height: 100%
  outline: none
  -moz-appearance: none
  font-family: sans-serif

.cell__textarea
  border: none

.input-wrapper
  margin: 3px 0 3px 0

  input, textarea
    border-radius: 5px
    border: 1px solid gray
    transition: 0.2s ease-in

  input:hover, textarea:hover
    border: 1px solid darkcyan
    box-shadow: 5px 5px 5px 5px gray

  textarea:focus, input:focus
    border: 1px solid blue

label
  text-align: start

.btn__remove
  border: none
  width: 100%
  height: 100%
  background: none
  cursor: pointer
  transition: 0.1s ease-in

.btn
  height: 40px
  width: 200px
  border-radius: 8px
  border: 1px solid brown
  background: burlywood
  text-transform: uppercase
  font-weight: 700
  cursor: pointer
  transition: 0.1s ease-in

.btn:hover
  background: brown

.btn__add-position
  width: 200px
.btn__generate
  width: 300px

.btn__remove:hover
  scale: 1.25

.input-group
  margin: 10px 0 10px 0
  align-items: start
  width: 50%
  display: grid
  grid-template-rows: 1fr

  input[type="date"], input[type="number"]
    width: fit-content

.input-group__header
  width: 100%
  display: grid
  grid-template-columns: 1fr 1fr

.input-group__number-date
  width: 80%
  align-items: start

  .input-wrapper
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 2fr

.input-group__org
  width: 80%
  align-items: end

  .input-wrapper
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 2fr

.input-group__price
  align-items: end

  .input-wrapper
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 1.5fr
.fields-group__footer
  align-items: start

  .input-wrapper
    display: grid
    grid-template-rows: 1fr
    grid-template-columns: 1fr 1.5fr

/* Customize the label (the container) */
.checkbox-wrapper
  display: block
  position: relative
  padding-left: 26px
  transform: translateY(-50%)
  top: -25%
  cursor: pointer
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

/* Hide the browser's default checkbox */
.checkbox-wrapper input
  position: absolute
  opacity: 0
  cursor: pointer
  height: 0
  width: 0

/* Create a custom checkbox */
.checkmark
  position: absolute
  top: 0
  left: 0
  height: 25px
  width: 25px
  background-color: #eee
  border: 1px solid black
  border-radius: 3px

/* On mouse-over, add a grey background color */
.checkbox-wrapper:hover input ~ .checkmark
  background-color: #ccc

/* When the checkbox is checked, add a blue background */
.checkbox-wrapper input:checked ~ .checkmark
  background-color: #2196F3

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after
  content: ""
  position: absolute
  display: none

/* Show the checkmark when checked */
.checkbox-wrapper input:checked ~ .checkmark:after
  display: block

/* Style the checkmark/indicator */
.checkbox-wrapper .checkmark:after
  left: 8px
  top: 4px
  width: 5px
  height: 10px
  border: solid white
  border-width: 0 3px 3px 0
  -webkit-transform: rotate(45deg)
  -ms-transform: rotate(45deg)
  transform: rotate(45deg)

.file
  margin: 15px 0 15px 0

.file-label
  background-color: indigo
  color: white
  padding: 0.5rem
  font-family: sans-serif
  border-radius: 0.3rem
  cursor: pointer
  margin-top: 1rem

#file-chosen
  margin-left: 0.3rem
  font-family: sans-serif

</style>
