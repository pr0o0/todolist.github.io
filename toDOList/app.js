let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault();

  //   得到input裡的值(value)
  let F = document.querySelector("form");
  //將表格內第一個，也就是輸入文字的 文字內容，賦值給按＋出來後的文字 用一個dotext去裝他
  let dotext = F.children[0].value;
  let month = F.children[1].value;
  let date = F.children[2].value;

  if (dotext === "" || month === "" || date === "") {
    alert("請輸入文字或日期");
    return;
  }
  //   console.log(F);

  // 要做一個按＋後顯示出來的列表包含做的日期跟做的事
  //   做一個div
  let plus = document.createElement("div");
  //把div內加入一個class=plus
  plus.classList.add("plus");
  //做一個paragraf是要寫作什模事
  let addtext = document.createElement("p");
  //在這個paragraf裡一樣加入一個class=addtext
  addtext.classList.add("addtext");
  //再做一個paragraf是要放入月份跟日期
  let md = document.createElement("p");
  //幫月份跟日期顯示出來的那行p加入一個class
  md.classList.add("addmn");

  //將寫出來的那行文字內容改成在框框內輸入的文字
  addtext.innerText = dotext;
  //將寫出來的那行文字內容改成在框框內輸入的月份跟日期
  md.innerText = month + "/" + date;
  //然後在div內依序加入他們 就會有兩行p在裡面 顯示做什麼事跟月份
  plus.appendChild(addtext);
  plus.appendChild(md);

  // 要加入綠色溝溝和紅色垃圾桶
  let cbutton = document.createElement("button");
  cbutton.classList.add("btn");
  cbutton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  cbutton.addEventListener("click", () => {
    // 記得把icon可以被點到消除，去css 設定i point event
    plus.classList.toggle("done");
  });

  let trash = document.createElement("button");
  trash.classList.add("tra");
  trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  trash.addEventListener("click", () => {
    let item = plus;

    item.style.animation = "delete 0.5s forwards";
    // 加forwards的原因是因為不讓他回到原始狀態
    // 設定動畫結束再把那行刪掉
    item.addEventListener("animationend", () => {
      let text = item.children[0].innerText;
      let mylist = JSON.parse(localStorage.getItem("k"));
      mylist.forEach((n, index) => {
        if (n.whatUwantDo === text) {
          {
            mylist.splice(index, 1);
            localStorage.setItem("k", JSON.stringify(mylist));
          }
        }
      });
      item.remove();
    });
  });
  plus.append(cbutton);
  plus.append(trash);

  plus.style.animation = "scaleup 0.5s ";

  //要儲存資料時，以一個物件的方式存進去比較好，所以得先創造一個物件並將輸入完的代辦事項放進去
  let save = {
    whatUwantDo: dotext,
    whenMonth: month,
    whenDate: date,
  };
  //先看電腦中有沒有儲存東西，所以取他的key也就是下面的這個k
  let mylist = localStorage.getItem("k");
  //如果電腦沒有東西，就用set儲存一個有array的object但要用json的method，也就是我上面做的save
  if (mylist == null) {
    //以array的方式存進去
    localStorage.setItem("k", JSON.stringify([save]));
  } else {
    //如果原本就有資料，就創造一個盒子，把原本有的那個資料，放到那個盒子裡，然後在加上輸入的代辦事項，加入這個arr
    let listarr = JSON.parse(mylist);
    listarr.push(save); //然後把輸入的代辦事項以array的型態加入
    localStorage.setItem("k", JSON.stringify(listarr));
  }

  console.log(JSON.parse(localStorage.getItem("k")));

  section.appendChild(plus);
  // 為了清空白色格子的字
  F.children[0].value = "";
  //   F.children[1].value = "";
  //   F.children[2].value = "";
});

//進網站前都要執行一次
loadData();

function loadData() {
  //把存處在網站中的數據拿出來顯示在網站上
  let mylist = localStorage.getItem("k");
  //先看裡面有沒有東西，有東西的話把它用json的方式以array的值領出來，反正不要是string就好，
  if (mylist !== null) {
    let listarr = JSON.parse(mylist);
    //然後把他裝在箱子裡讓他去跑，
    listarr.forEach((item) => {
      //做出一個叫做plus的箱子以div元素樣貌裝東西
      let plus = document.createElement("div");
      plus.classList.add("plus");
      //做出一個叫addtext的箱子以p的元素可以放入文字
      let addtext = document.createElement("p");
      addtext.classList.add("addtext");
      //把箱子裡跑到的每個索引值中的字 賦值給剛剛造出來的箱子，把字放進去
      addtext.innerText = item.whatUwantDo;

      let md = document.createElement("p");
      md.classList.add("addmn");
      md.innerText = item.whenMonth + "/" + item.whenDate;

      //分別把跑出來的值後放在箱子，把箱子放在div裡
      plus.appendChild(addtext);
      plus.appendChild(md);

      let cbutton = document.createElement("button");
      cbutton.classList.add("btn");
      cbutton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      cbutton.addEventListener("click", () => {
        // 記得把icon可ss以被點到消除，去css 設定i point event
        plus.classList.toggle("done");
      });

      let trash = document.createElement("button");
      trash.classList.add("tra");
      trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      trash.addEventListener("click", () => {
        let item = plus;

        item.style.animation = "delete 0.5s forwards";
        // 加forwards的原因是因為不讓他回到原始狀態
        // 設定動畫結束再把那行刪掉
        item.addEventListener("animationend", () => {
          //刪除儲存的資料
          //先看這個要刪除的item是什麼，把這個item的文字放入一個箱子
          let text = item.children[0].innerText;
          //然後把儲存中的數據丟到一個箱子裡，才能拿出來對比
          let mylist = JSON.parse(localStorage.getItem("k"));
          //用箱子中的數據去跑foreach，判斷，如果數據中的wtuwantdo等於item的文字，就將它在的這個位置刪除
          mylist.forEach((n, index) => {
            if (n.whatUwantDo === text) {
              {
                //簡單來說，在foreach跑的時候，跑到text跟whatuwantdo得值是相等的時候，從那個索引值刪除一個數並返回
                //所以會變成當她們相等時，把那個索引值刪掉，其餘的在存進mylist裡
                mylist.splice(index, 1);
                localStorage.setItem("k", JSON.stringify(mylist));
              }
            }
          });

          item.remove();
        });
      });
      plus.append(cbutton);
      plus.append(trash);

      plus.style.animation = "scaleup 0.5s ";
      section.appendChild(plus);
    });
  }
}

//老師的
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].whenMonth) > Number(arr2[j].whenMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].whenMonth) < Number(arr2[j].whenMonth)) {
      result.push(arr1[i]);
      i++;
    } else if (Number(arr1[i].whenMonth) == Number(arr2[j].whenMonth)) {
      if (Number(arr1[i].whenDate) > Number(arr2[j].whenDate)) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
  }
}

let sortButton = document.querySelector("div.bbb button");
sortButton.addEventListener("click", () => {
  // sort data
  // let sortedArray = mergeSort(JSON.parse(localStorage.getItem("k")));
  let sortedArrays = JSON.parse(localStorage.getItem("k"));

  let s = sortedArrays.sort(function (a, b) {
    return a.whenMonth - b.whenMonth;
  });

  let ss = s.sort(function (a, b) {
    return a.whenDate - b.whenDate;
  });

  localStorage.setItem("k", JSON.stringify(ss));

  // remove data
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    section.children[0].remove();
  }

  // load data
  loadData();
});

console.log(section.children);
