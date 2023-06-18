class Calculator {
  #operator = undefined;
  /**
   * string array
   */
  #dataArray = [];

  $calculatorEl;
  $displayDataEl;
  $clearEl;
  $calculateEl;
  $calculatorBtnGroupEl;
  constructor() {
    this.assignElement();
    this.addEvent();
    this.updateDisplayData();
  }

  assignElement() {
    this.$calculatorEl = document.getElementById("calculator");
    this.$displayDataEl = document.querySelector(".display__data");
    this.$clearEl = document.querySelector(".clear");
    this.$calculateEl = document.querySelector(".calculate");
    this.$calculatorBtnGroupEl = document.querySelector(
      ".calculator__btn-group"
    );
  }

  addEvent() {
    this.$clearEl.addEventListener("click", this.clearData.bind(this));

    this.$calculateEl.addEventListener("click", this.calculateData.bind(this));

    this.$calculatorBtnGroupEl.addEventListener(
      "click",
      this.addData.bind(this)
    );
  }
  clearData() {
    this.#dataArray = [];
    this.#operator = undefined;
  }

  updateDisplayData() {
    console.log("array", this.#dataArray);
    this.$displayDataEl.textContent = this.#dataArray.join("");
  }

  calculateData() {}

  addData(event) {
    const eventTarget = event.target;
    const data = eventTarget.textContent;
    const lastIndex = this.#dataArray.length - 1;
    const lastItem = this.#dataArray[lastIndex];

    switch (eventTarget.className) {
      case "number":
        console.log(/[0-9.]/g.test(lastItem), lastItem);
        if (lastIndex < 0) {
          this.#dataArray = [data];
        } else {
          // 마지막 요소가 숫자이면 n자리 수 로 변경, 숫자가 아닐 시 this.#dataArray에 data  추가
          /[0-9.]/g.test(lastItem)
            ? this.#dataArray.splice(lastIndex, 1, `${lastItem}${data}`)
            : this.#dataArray.push(data);
        }
        break;
      case "operator":
        this.#dataArray.push(data);
        break;
      case "decimal":
        if (/[0-9]/g.test(lastItem)) {
          this.#dataArray.splice(lastIndex, 1, `${lastItem}.`);
        } else {
          const item = "0.";
          lastIndex < 0
            ? (this.#dataArray = [item])
            : this.#dataArray.push(item);
        }

        break;
      default:
        break;
    }

    this.updateDisplayData();
  }
}

new Calculator();
