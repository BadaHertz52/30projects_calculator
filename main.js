class Calculator {
  /**
   *유저가 클릭한 버튼의 data 값을 담고 있는 배열로, 계산식을 화면에 표시하고 계산하는 과정에 사용됨
   * type :string array
   */
  #dataArray = [];

  $msgEl;
  $calculatorEl;
  $displayDataEl;
  $clearEl;
  $calculateEl;
  $btnRowElList;
  constructor() {
    this.assignElement();
    this.addEvent();
    this.updateDisplayData();
  }

  assignElement() {
    this.$msgEl = document.querySelector(".msg");
    this.$calculatorEl = document.getElementById("calculator");
    this.$displayDataEl = document.querySelector(".display__data");
    this.$clearEl = document.querySelector(".clear");
    this.$calculateEl = document.querySelector(".calculate");
    this.$btnRowElList = document.querySelectorAll(".button__row");
  }

  addEvent() {
    this.$clearEl.addEventListener("click", this.onClickClearBtn.bind(this));

    this.$calculateEl.addEventListener(
      "click",
      this.onClickCalculate.bind(this)
    );

    this.$btnRowElList.forEach((i) =>
      i.addEventListener("click", this.addData.bind(this))
    );
  }
  /**
   * #dataArray을 글자로 변경해 화면에 표시
   */
  updateDisplayData() {
    const text = this.#dataArray.join("");
    this.$displayDataEl.textContent = text;
    this.$msgEl.classList.toggle("on", text.length > 36);
  }
  /**
   * 계산식에서 한 글자씩 삭제
   */
  onClickClearBtn() {
    const lastIndex = this.#dataArray.length - 1;
    const lastItem = this.#dataArray[lastIndex];
    //this.#dataArray 가 빈 배열일 경우, 실행 멈춤
    if (lastItem === undefined) return;
    // 마지막 요소의 글자 수에 따라 다른 과정
    if (lastItem.length > 1) {
      const editedItem = lastItem.slice(0, lastItem.length - 1);
      this.#dataArray.splice(lastIndex, 1, editedItem);
    } else {
      this.#dataArray.pop();
    }
    this.updateDisplayData();
  }
  /**
   * 숫자 이전의 연산 기호를 참고해서 계산하는 함수
   * @param {previousResult} a
   * @param {currentValue} c
   * @param {currentIndex} i
   * @returns
   */
  calculateData(a, c, i) {
    const prevResult = Number(a);
    const currentItem = Number(c);
    let result = prevResult;
    switch (this.#dataArray[i - 1]) {
      case "+":
        result = prevResult + currentItem;
        break;
      case "-":
        result = prevResult - currentItem;
        break;
      case "*":
        result = prevResult * currentItem;
        break;
      case "/":
        result = prevResult / currentItem;
        break;
      default:
        break;
    }
    return result;
  }

  onClickCalculate() {
    const result = this.#dataArray.reduce((a, c, i) =>
      i === 0 ? c : /[0-9.]/g.test(c) ? this.calculateData(a, c, i) : a
    );
    this.#dataArray = [result];
    this.updateDisplayData();
  }
  /**
   * button__row 클릭 시, 버튼의 클래스에 따라 #dataArray에 요소를 수정 또는 추가
   */
  addData(event) {
    if (this.#dataArray.join("").length > 36) return;
    const eventTarget = event.target;
    const data = eventTarget.textContent;
    const lastIndex = this.#dataArray.length - 1;
    const lastItem = this.#dataArray[lastIndex];
    switch (eventTarget.classList[0]) {
      case "number":
        if (lastItem === undefined) {
          this.#dataArray = [Number(data)];
        } else {
          // 마지막 요소가 숫자이면 n자리 수로 변경, 숫자가 아닐 시 this.#dataArray에 data  추가
          /[0-9.]/g.test(lastItem)
            ? this.#dataArray.splice(lastIndex, 1, `${lastItem}${data}`)
            : this.#dataArray.push(data);
        }
        break;
      case "operator":
        if (!/[0-9.]/g.test(lastItem)) return;
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
