<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from 'file-saver';
import { convert } from 'number-to-words-ru'
import axios from "axios";

interface Position {
  name: string,
  characteristics?: string,
  productOffer: string,
  productOfferIsAnalog: boolean,
  unit: string,
  quantity: number,
  priceWithoutNds: number,
  sumWithOutNds: number,
}

// Загрузка данных из sessionStorage при монтировании компонента
onMounted(() => {
  loadFromSessionStorage();
  window.addEventListener('beforeunload', saveToSessionStorage);
});

// Сохранение данных в sessionStorage перед перезагрузкой или закрытием вкладки
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveToSessionStorage);
});

// saveToSessionStorage сохраняет все переменные в sessionStorage
const saveToSessionStorage = () => {
  sessionStorage.setItem('state', JSON.stringify({
    accountNumber: accountNumber.value,
    accountDate: accountDate.value,
    organisationName: organisationName.value,
    organisationDept: organisationDept.value,
    totalWithoutNds: totalWithoutNds.value,
    nds: nds.value,
    totalWithNds: totalWithNds.value,
    paymentConditions: paymentConditions.value,
    deliveryTime: deliveryTime.value,
    paymentTime: paymentTime.value,
    positions: positions.value,
    isCharacteristicsInUse: isCharacteristicsInUse.value,
    fileName: fileName.value,
    fileData: fileData.value,
    isError: isError.value,
    errorMsg: errorMsg.value,
  }));
};

// loadFromSessionStorage загружает все переменные из sessionStorage
const loadFromSessionStorage = () => {
  const savedState = sessionStorage.getItem('state');
  if (savedState) {
    const state = JSON.parse(savedState);
    accountNumber.value = state.accountNumber;
    accountDate.value = state.accountDate;
    organisationName.value = state.organisationName;
    organisationDept.value = state.organisationDept;
    totalWithoutNds.value = state.totalWithoutNds;
    nds.value = state.nds;
    totalWithNds.value = state.totalWithNds;
    paymentConditions.value = state.paymentConditions;
    deliveryTime.value = state.deliveryTime;
    paymentTime.value = state.paymentTime;
    positions.value = state.positions;
    isCharacteristicsInUse.value = state.isCharacteristicsInUse;
    fileName.value = state.fileName;
    fileData.value = state.fileData;
    isError.value = state.isError;
    errorMsg.value = state.errorMsg;
  }
};

// Основные данные шаблона документа
const accountNumber = ref('');
const accountDate = ref('');
const organisationName = ref('');
const organisationDept = ref('В тендерный отдел');
const totalWithoutNds = ref(0);
const nds = ref(0);
const totalWithNds = ref(0);
const paymentConditions = ref('в соответствии с проектом договора');
const deliveryTime = ref(90);
const paymentTime = ref(30);
const isCharacteristicsInUse = ref(true)

// Позиции ТКП
const positions = ref<Position[]>([
  {
    name: '',
    characteristics: '',
    productOffer: '',
    productOfferIsAnalog: false,
    unit: 'шт',
    quantity: 1,
    priceWithoutNds: 0,
    sumWithOutNds: 0,
  }
]);

// Загруженный файл-шаблон
const fileData = ref<ArrayBuffer | null>(null);

// Ошибка файла
const isError = ref(false)
const errorMsg = ref('')

// Имя файла-шаблона
const fileName = ref('Шаблон не загружен')

// handleFileUpload получает файл и имя файла после его загрузки пользователем
const handleFileUpload = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  fileName.value = 'Шаблон не загружен'
  fileData.value = null
  if (file) {
    isError.value = false
    if (!file.name.includes(".docx") || !file.name.includes(".doc")) {
      showError("Неправильное расширение файла.Необходимо .docx или .doc")
      return
    }
    fileName.value = file.name
    const reader = new FileReader();

    reader.onload = () => {
      fileData.value = reader.result as ArrayBuffer;
    };

    reader.readAsArrayBuffer(file);
  }
};

// calculateSum подсчитывает сумму по позиции
const calculateSum = (position: Position) => {
  position.sumWithOutNds = position.priceWithoutNds * position.quantity
  calculateTotalSum()
}

// calculatePrice подсчитывает цену по позиции
const calculatePrice = (position: Position) => {
  if (position.quantity === 0)
    position.priceWithoutNds = 0
  else
    position.priceWithoutNds = position.sumWithOutNds / position.quantity
  calculateTotalSum()
}

// calculateTotalSum подсчитывает общую сумму без НДС
const calculateTotalSum = () => {
  totalWithoutNds.value = 0
  positions.value.forEach(positionItem => {
    totalWithoutNds.value += positionItem.sumWithOutNds
  })
  nds.value = totalWithoutNds.value * 0.2
  totalWithNds.value = nds.value + totalWithoutNds.value
}

// cancelFloats запрещает вводить точку и запятую
const cancelFloats = (event: KeyboardEvent) => {
  if (event.key === '.' || event.key === ',') {
    event.preventDefault()
  }
}

const formatToTwoDecimals = (event: Event) => {
  const input = event.target as HTMLInputElement
  const numericValue = parseFloat(input.value)
  if (!isNaN(numericValue)) {
    input.value = numericValue.toFixed(2)
  }
}

const formatNumberToTwoDecimals = (number: number) => {
  if (!isNaN(number)) {
    return number.toFixed(2)
  }
}

// convertToString переводит дни в строку
const convertToString = (number: number) => {
  if (number % 10 === 1) return `${number} календарный день`
  else if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4)
    return `${number} календарный дня`
}

// formatDate приводит дату к виду ДД.ММ.ГГГГ
const formatDate = (dateStr: string) => {
  const dateParts = dateStr.split('-')
  return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
}

// showFileError включает отображение ошибки документа
const showError = (msg: string) => {
  errorMsg.value = msg
  isError.value = true
}

// generateDocument генерирует документ
const generateDocument = () => {
  isError.value = false
  if (!fileData.value) {
    showError("Шаблон документа не загружен")
    return
  }

  // Удаляем характеристики, если они не используются
  if (!isCharacteristicsInUse.value) {
    positions.value = positions.value.map(position => {
      const { characteristics, ...rest } = position
      return rest
    })
  }

  // Валидация переменных
  if ((accountNumber.value === '') ||
      (accountDate.value === '') ||
      (organisationName.value === '') ||
      (organisationDept.value === '') ||
      (paymentConditions.value === '') ||
      (!(totalWithoutNds.value > 0)) ||
      (!(nds.value > 0)) ||
      (!(totalWithNds.value > 0)) ||
      (!(deliveryTime.value > 0)) ||
      (!(paymentTime.value > 0))
      ){
    showError("Не указаны необходимые переменные!")
    return
  }

  const zip = new PizZip(fileData.value)
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  })

  const templateData = {
    accountNumber: accountNumber.value,
    accountDate: formatDate(accountDate.value),
    organisationName: organisationName.value,
    organisationDept: organisationDept.value,
    totalWithoutNds: formatNumberToTwoDecimals(totalWithoutNds.value),
    ndsSum: formatNumberToTwoDecimals(totalWithoutNds.value * 0.2),
    totalWithNds: formatNumberToTwoDecimals(totalWithNds.value),
    totalWithNdsLetters: convert(totalWithNds.value),
    deliveryConditions: paymentConditions.value,
    deliveryTime: deliveryTime.value  ,
    paymentTime: paymentTime.value,
    positions: positions.value,
    isCharacteristicsInUse: isCharacteristicsInUse.value,
    isCharacteristicsNotInUse: !isCharacteristicsInUse.value,
  }

  doc.setData(templateData)

  try {
    doc.render()
  } catch (error) {
    console.error('Ошибка при рендеринге шаблона', error)
    throw error
  }

  const generatedDocBuffer = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })

  const fileName = `ТКП_№${accountNumber.value}_от_${accountDate.value}_для_${organisationName.value}.docx`

  saveAs(generatedDocBuffer, fileName)

  // Тут конвертация в PDF массива generatedDocBuffer
}

const characteristicsClass = computed(() => {
  return isCharacteristicsInUse.value ? 'with-characteristics' : 'without-characteristics'
})

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
  <div class="container">
    <div class="file-upload-container">
      <div class="file-upload-wrapper">
        <input class="file-input" type="file" id="actual-btn" hidden @change="handleFileUpload"/>
        <label class="file-label" for="actual-btn">Загрузить шаблон</label>
        <span id="file-chosen">{{ fileName }}</span>
      </div>
      <span v-if="isError" class="file-error-wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12V7.5M12 15.3354V15.375M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>{{ errorMsg }}</p>
      </span>
    </div>

    <div class="header-inputs">
      <div class="input-group input-group__number-date">
        <div class="input-wrapper">
          <label>№ КП:</label>
          <input v-model="accountNumber" type="text" placeholder="1234"/>
        </div>
        <div class="input-wrapper">
          <label>Дата КП:</label>
          <input v-model="accountDate" type="date" />
        </div>
      </div>
      <div class="input-group input-group__org">
        <div class="input-wrapper">
          <label>Заказчик:</label>
          <input v-model="organisationName" type="text" placeholder="Наименование организации"/>
        </div>
        <div class="input-wrapper">
          <label>Отдел:</label>
          <input v-model="organisationDept" type="text" placeholder="Например: 'В отдел продаж', 'В тендерный отдел'"/>
        </div>
      </div>
    </div>

    <div class="characteristics-toggler-wrapper">
      <label class="checkbox-wrapper">
        <input type="checkbox" v-model="isCharacteristicsInUse">
        <span class="checkmark"></span>
      </label>
      <span>Характеристики</span>
    </div>

    <div class="table">
      <div class="table__header" :class="characteristicsClass">
        <div class="header-cell">№<br>п/п</div>
        <div class="header-cell">Наименование<br>(Требование)</div>
        <div class="header-cell" v-if="isCharacteristicsInUse">Требуемые<br>характеристики</div>
        <div class="header-cell">Предложение участника<br>(выделить аналоги)</div>
        <div class="header-cell">Ед.<br>измер.</div>
        <div class="header-cell">Кол-во</div>
        <div class="header-cell">Цена за ед.,<br>без НДС</div>
        <div class="header-cell">Стоимость,<br>без НДС</div>
        <div class="header-cell"></div>
      </div>

      <div class="table__row" :class="characteristicsClass" v-for="(position, index) in positions" :key="index">
        <div class="cell cell--index">{{ index + 1 }}</div>
        <div class="cell">
          <textarea class="cell__textarea" v-model="position.name"></textarea>
        </div>
        <div class="cell" v-if="isCharacteristicsInUse">
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
          <input class="cell__input" type="number" v-model="position.quantity" @input="calculateSum(position)">
        </div>
        <div class="cell">
          <input class="cell__input" type="number" v-model="position.priceWithoutNds" @blur="formatToTwoDecimals" @input="calculateSum(position)">
        </div>
        <div class="cell">
          <input class="cell__input" type="number" v-model="position.sumWithOutNds" @blur="formatToTwoDecimals" @input="calculatePrice(position)">
        </div>
        <div class="cell cell--button">
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
        <label>Всего без НДС:</label>
        <input v-model="totalWithoutNds" @blur="formatToTwoDecimals" type="number" placeholder="12345,12"/>
      </div>

      <div class="input-wrapper">
        <label>НДС (20%):</label>
        <input v-model="nds" @blur="formatToTwoDecimals" type="number" placeholder="12345,12"/>
      </div>

      <div class="input-wrapper">
        <label>Всего с НДС:</label>
        <input v-model="totalWithNds" @blur="formatToTwoDecimals" type="number" placeholder="12345,12"/>
      </div>
    </div>

    <div class="input-group input-group__footer">
      <div class="input-wrapper input-wrapper--with-borders">
        <label>Условия доставки:</label>
        <textarea v-model="paymentConditions"></textarea>
      </div>

      <div class="input-wrapper input-wrapper--with-borders">
        <label>Срок оплаты:</label>
        <input v-model="paymentTime" type="number" step="1" @keydown="cancelFloats"/>
        <span>календарных дней</span>
      </div>

      <div class="input-wrapper input-wrapper--with-borders">
        <label>Срок предложения:</label>
        <input v-model="deliveryTime" type="number" step="1" @keydown="cancelFloats"/>
        <span>календарных дней</span>
      </div>
    </div>

    <button class="btn btn__generate" @click="generateDocument">Сгенерировать документ</button>
  </div>
</template>

<style scoped lang="sass">
@import "src/styles/variables"
.characteristics-toggler-wrapper
  width: fit-content
  margin: 10px 0 10px 0
  display: flex
  height: 30px
  gap: 10px
  align-items: center
  span
    align-content: center
    color: $c-grey-text

.table
  border: 1px solid black
  margin: 10px 0 10px 0
.header-cell
  display: flex
  border: 1px solid black
  padding: 4px 0 4px 0
  align-items: center
  justify-content: center
  overflow: hidden
.with-characteristics
  grid-template-columns: 3% 20% 20% 20% 6% 7% 10% 10% 4%
.without-characteristics
  grid-template-columns: 4% 25% 25% 8% 10% 12% 12% 4%
.table__header
  display: grid
  border-bottom: 1px solid black
  background: $c-table-header-bg
  color: black
.table__row
  display: grid
.cell
  display: flex
  align-items: center
  height: 100%
  min-height: 50px
  width: 100%
  border: 1px solid black
.cell--index
  justify-content: center
.cell--sum
  padding: 5px 3px 5px 3px
.cell--button
  overflow: hidden
.cell__input
  height: 100%
  width: 100%
  border-radius: 0
  border: none
  text-overflow: ellipsis
.cell--checkbox
  display: flex
  padding-right: 6px
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

.btn__remove
  border: none
  width: 100%
  height: 100%
  background: none
  cursor: pointer
  transition: 0.1s ease-in

.btn
  height: 45px
  border-radius: 8px
  border: 1px solid $c-btn-border
  background: $c-btn
  color: white
  font-weight: 400
  font-size: 18px
  cursor: pointer
  transition: 0.1s ease-in
  width: fit-content
  padding: 0 10px 0 10px
  box-shadow: 0 0 3px $c-btn-shadow

.btn:hover
  background: darken($c-btn, 10%)

.btn__add-position
  align-self: center

.btn__remove:hover
  scale: 1.25

input, textarea
  padding: 5px 3px 5px 3px

.input-group
  margin: 10px 0 10px 0
  gap: 5px
  align-items: start
  display: flex
  flex-direction: column

  .input-wrapper
    display: flex
    margin: 3px 0 3px 0
    border-bottom: 1px solid $c-btn-border
    label
      font-weight: 600
      display: flex
      align-items: center
      text-align: start

    input, textarea
      border-radius: 5px
      border: none
      transition: 0.2s ease-in

    input
      height: 35px

    textarea:hover
      border: 1px solid $c-btn
      box-shadow: 0 0 3px 1px $c-btn

    textarea:focus
      border: 1px solid $c-btn

  .input-wrapper--with-borders
    border: none
    textarea, input
      border: 1px solid $c-input-border
      max-width: 800px

.header-inputs
  width: 100%
  display: flex
  gap: 40px

  .input-group__number-date
    .input-wrapper
      label
        min-width: 75px
      input
        width: 125px

  .input-group__org
    .input-wrapper
      label
        min-width: 85px
      input
        width: 400px

.input-group__price
  gap: 0
  width: fit-content
  align-self: end
  box-shadow: 0 0 3px $c-btn-shadow

  .input-wrapper
    border: 1px solid $c-input-border
    padding: 3px
    margin: 0
    label
      min-width: 130px
    input
      width: 150px

.input-group__footer
  align-items: start

  .input-wrapper
    label
      min-width: 180px
    textarea
      resize: both
      min-width: 500px
    input
      width: 50px
    span
      align-content: center
      margin-left: 6px

/* Customize the label (the container) */
.checkbox-wrapper
  display: block
  position: relative
  width: 25px
  height: 25px
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
  background-color: white
  border: 1px solid black
  border-radius: 3px

/* On mouse-over, add a grey background color */
.checkbox-wrapper:hover input ~ .checkmark
  background-color: $c-input-border

/* When the checkbox is checked, add a blue background */
.checkbox-wrapper input:checked ~ .checkmark
  background-color: $c-input-border

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
  border: solid black
  border-width: 0 2px 2px 0
  -webkit-transform: rotate(45deg)
  -ms-transform: rotate(45deg)
  transform: rotate(45deg)

.file-upload-container
  display: flex
  flex-direction: column
  height: fit-content
  width: fit-content
  margin: 20px auto 15px auto
  align-items: center

.file-upload-wrapper
  display: flex
  flex-direction: row

  label, span
    height: 40px

.file-error-wrapper
  display: flex
  color: #bd0101
  justify-content: space-around
  font-weight: 700
  align-items: center
  margin-top: 8px
  width: 100%
  max-width: 340px

  p
    width: 90%
  svg
    width: 10%

.file-input
  height: 100%

.file-label
  height: 100%
  justify-content: center
  align-items: center
  padding: 10px
  background-color: $c-btn
  font-weight: 700
  color: white
  border: 1px solid $c-btn-border
  font-family: sans-serif
  border-top-left-radius: 5px
  border-bottom-left-radius: 5px
  cursor: pointer
  display: flex

.file-label:hover
  background: darken($c-btn, 10%)

#file-chosen
  align-content: center
  padding: 10px
  font-family: sans-serif
  border-top: 1px solid black
  border-bottom: 1px solid black
  border-right: 1px solid black
  border-bottom-right-radius: 5px
  border-top-right-radius: 5px

</style>
