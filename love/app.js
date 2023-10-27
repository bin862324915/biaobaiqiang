AV.init({
  appId: '1Ao7imckprhj98luQK1xebPA-gzGzoHsz',
  appKey: 'cY0YqjpaGxRvGE4o2Mf21Zbq',
  serverURL: 'https://1ao7imck.lc-cn-n1-shared.com',
});

const mynameInput = document.getElementById('mynamein');
const younameInput = document.getElementById('younamein');
const zhengwenInput = document.getElementById('zhengwenin');
const tjButton = document.getElementById('tj');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modalText');
const closeModalButton = document.querySelector('#closeModal');

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
tjButton.addEventListener('click', () => {
  const myname = mynameInput.value;
  const youname = younameInput.value;
  const inputText = document.getElementById("zhengwenin").value;
  const convertedText = inputText.replace(/\n/g, "<br>");
  const zhengwen = convertedText;

  if (myname && youname && zhengwen) {
    const BBQ = AV.Object.extend('bbq');
    const bbqRecord = new BBQ();
    bbqRecord.set('from', myname);
    bbqRecord.set('to', youname);
    bbqRecord.set('data', zhengwen);
    bbqRecord.save().then(() => {
      bbknone();
      mynameInput.value = '';
      younameInput.value = '';
      zhengwenInput.value = '';
      modalText.textContent = '已发表，刷新网页查看哦(｡♥ᴗ♥｡) ';
      modal.style.display = 'block';
      return;
    }).catch(() => {
    modalText.textContent = '出错啦！请重试哦(✖人✖)';
    modal.style.display = 'block';
    return;
    });
  } else {
    modalText.textContent = '信息都填写了嘛？( • ̀ω•́ )✧';
    modal.style.display = 'block';
    return;
  }
});
const fbygBlock = document.getElementById('fbyg');
const maskbiaoBlock = document.getElementById('maskbiao');
const bbkBlock = document.getElementById('bbk');
const qxan = document.getElementById('qx');
fbygBlock.addEventListener('click', () => {
  maskbiaoBlock.style.display = 'block';
  bbkBlock.style.display = 'block';
});

function bbknone() {
  const input1 = document.getElementById('mynamein');
  const input2 = document.getElementById('younamein');
  const input3 = document.getElementById('zhengwenin');
  input1.value = '';
  input2.value = '';
  input3.value = '';
  maskbiaoBlock.style.display = 'none';
  bbkBlock.style.display = 'none';
}

qxan.addEventListener('click', () => {
  bbknone();
  modal.style.display = 'none';
});

const parentBlock = document.querySelector('.zhuti');
const query = new AV.Query('bbq');
query.descending('createdAt');
const processLeanCloudData = new Promise((resolve, reject) => {
  query.find().then((bbqRecords) => {
    bbqRecords.forEach((record) => {
      const from = record.get('from');
      const to = record.get('to');
      const data = record.get('data');
      const createdAt = record.get('createdAt');
	const date = new Date(createdAt);
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	const zhutiBlock = document.querySelector('.zhuti');
	const zhutiWidth = zhutiBlock.offsetWidth;
	const zhutiHeight = zhutiBlock.offsetHeight;
	const randomX = Math.floor(Math.random() * (zhutiWidth - 260)); 
	const randomY = Math.floor(Math.random() * (zhutiHeight - 300));
	const son = document.createElement('div');
	son.className = 'son';

  son.innerHTML = `
  <p id="biaoti">${from} 想对 ${to} 说:</p>
  <p id="neirong">${data}</p>
  <p id="shijian">${formattedDate}</p>
`;

	const randomColor = getRandomBackgroundColor();
	son.style.backgroundColor = randomColor;
	son.style.left = `${randomX}px`;
	son.style.top = `${randomY}px`;
	zhutiBlock.appendChild(son);
    });
    resolve();
  });
});
const initializeDragFunction = new Promise((resolve, reject) => {
  processLeanCloudData.then(() => {
    dragFn('.son', '.zhuti');
    resolve();
  });
});

Promise.all([processLeanCloudData, initializeDragFunction]).then(() => {
  console.log(`
                    _     _         _     _             
                   | |   (_)       | |   | |            
__      _____ _ __ | |__  _ _ __   | |__ | | ___   __ _ 
\\ \\ /\\ / / _ \\ '_ \\| '_ \\| | '_ \\  | '_ \\| |/ _ \\ / _\` |
 \\ V  V /  __/ | | | |_) | | | | | | |_) | | (_) | (_| |
  \\_/\\_/ \\___|_| |_|_.__/|_|_| |_| |_.__/|_|\\___/ \\__, |
                                                   __/ |
                                                  |___/
`);
});


function dragFn(dragObj, parent) {
  $(dragObj).mousedown(function (e) {
    var _this = $(this);
    var parent_h = $(parent)[0].offsetHeight;
    var parent_w = $(parent)[0].offsetWidth;
    var drag_h = $(this)[0].offsetHeight;
    var drag_w = $(this)[0].offsetWidth;
    var dragX = e.clientX - $(this)[0].offsetLeft;
    var dragY = e.clientY - $(this)[0].offsetTop;

    $(this).css('z-index', '9').siblings().css('z-index', '1');

    $(document).mousemove(function (e) {
      var l = e.clientX - dragX;
      var t = e.clientY - dragY;
      if (l < 0) {
        l = 0;
      } else if (l > parent_w - drag_w) {
        l = parent_w - drag_w;
      }
      if (t < 0) {
        t = 0;
      } else if (t > parent_h - drag_h) {
        t = parent_h - drag_h;
      }
      _this.css({
        left: l + 'px',
        top: t + 'px',
      });
    });
  });
  $(document).mouseup(function () {
    $(this).off('mousemove');
  });
}

function getRandomBackgroundColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = 0.9;

  return `rgba(${r},${g},${b},${alpha})`;
}

function limitCharacters(textarea, maxCharacters) {
  const text = textarea.value;
  if (text.length > maxCharacters) {
    textarea.value = text.substring(0, maxCharacters);
  }
}