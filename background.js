function showAlert() {
  const isStartGame =
    document.querySelector("style[title='egg-hunt']") !== null;
  let getEggCount = 0;
  let startGame = false;
  let stopGame = false;

  const cleanSite = () => {
    if (stopGame) {
      alert("☆また遊んでね☆");
    } else {
      alert("エッグハント成功！！☆また遊んでね☆");
    }
    const eggs = document.querySelectorAll(".egg-hunt-item");
    eggs.forEach((egg) => {
      egg.remove();
    });
    document.querySelector("style[title='egg-hunt']").remove();
  };

  const doGame = () => {
    const bodyheight = document.body.clientHeight;
    const bodyWidth = window.innerWidth;
    const currentHeight = window.scrollY + 400;

    const randomWidth = () => {
      const minusOrPlus = Math.floor(Math.random() * 2) === 0 ? "-" : "";
      const width = Math.floor(Math.random() * bodyWidth) / 2;
      return minusOrPlus + width;
    };
    const randomHeight = () => {
      const minusOrPlus = Math.floor(Math.random() * 2) === 0 ? "-" : "";
      let height;
      if (minusOrPlus === "-") {
        // 上に移動の場合、0〜現在地へ
        height = Math.floor(Math.random() * currentHeight);
      } else {
        // 下に移動の場合、現在地〜サイト高さへ
        height = Math.floor(Math.random() * (bodyheight - currentHeight));
      }
      return minusOrPlus + height;
    };
    // style追加
    const styleContent = `
        @keyframes move_egg1 { 
            to { transform: translate(${randomWidth()}px,${randomHeight()}px); }  
        }
        @keyframes move_egg2 { 
            to { transform: translate(${randomWidth()}px,${randomHeight()}px); }  
        }
        @keyframes move_egg3 { 
            to { transform: translate(${randomWidth()}px,${randomHeight()}px); }  
        }
        @keyframes move_egg4 { 
            to { transform: translate(${randomWidth()}px,${randomHeight()}px); }  
        }
        @keyframes move_egg5 { 
            to { transform: translate(${randomWidth()}px,${randomHeight()}px); }  
        }
        `;
    const newStyle = document.createElement("style");
    newStyle.title = "egg-hunt";
    newStyle.textContent = styleContent;
    document.getElementsByTagName("head")[0].appendChild(newStyle);

    // エッグ追加
    const image_path1 = chrome.runtime.getURL("images/egg1.png");
    const image_path2 = chrome.runtime.getURL("images/egg2.png");
    const image_path3 = chrome.runtime.getURL("images/egg3.png");
    const image_path4 = chrome.runtime.getURL("images/egg4.png");
    const image_path5 = chrome.runtime.getURL("images/egg5.png");
    const imgWithUrl1 = `<img id="egg-hunt-item1" class="egg-hunt-item" src="${image_path1}" style="top:${currentHeight}px">`;
    const imgWithUrl2 = `<img id="egg-hunt-item2" class="egg-hunt-item" src="${image_path2}" style="top:${currentHeight}px">`;
    const imgWithUrl3 = `<img id="egg-hunt-item3" class="egg-hunt-item" src="${image_path3}" style="top:${currentHeight}px">`;
    const imgWithUrl4 = `<img id="egg-hunt-item4" class="egg-hunt-item" src="${image_path4}" style="top:${currentHeight}px">`;
    const imgWithUrl5 = `<img id="egg-hunt-item5" class="egg-hunt-item" src="${image_path5}" style="top:${currentHeight}px">`;
    const bodyTag = document.getElementsByTagName("body")[0];
    bodyTag.insertAdjacentHTML("afterbegin", imgWithUrl1);
    bodyTag.insertAdjacentHTML("afterbegin", imgWithUrl2);
    bodyTag.insertAdjacentHTML("afterbegin", imgWithUrl3);
    bodyTag.insertAdjacentHTML("afterbegin", imgWithUrl4);
    bodyTag.insertAdjacentHTML("afterbegin", imgWithUrl5);

    // イベントリスナー追加
    const items = document.querySelectorAll(".egg-hunt-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        getEggCount++;
        item.style.display = "none";
        if (getEggCount === 5) {
          cleanSite();
        }
      });
    });
  };

  // アラート
  if (isStartGame) {
    stopGame = confirm(
      `まだエッグが残っているよ。\r\nエッグハントを中止しますか？`
    );
  } else {
    startGame = confirm(
      "Let's エッグハント!\r\nイースターエッグを5つ探してクリックしてね。"
    );
  }
  if (stopGame) {
    cleanSite();
  }
  if (startGame) {
    doGame();
  }
}

// 拡張機能タグがクリックされた
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showAlert,
  });
});
