// float-toolbar.js
class FloatToolbar {
  constructor(options = {}) {
    this.config = {
      items: [],
      position: { right: '20px' },
      theme: 'light',
      breakpoint: 1199,
      toggleIcon: 'assets/navar.svg', // 添加默认值
      ...options,
    };
    this.isOpen = true;
    this.init();
  }

  init() {
    this.injectStyles();
    this.createContainer();
    this.createToggleButton();
    this.createToolbar();
    this.setupEventListeners();
    this.handleResponsive();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      li {
        list-style-type: none;
      }
      a {
        text-decoration:none;
      }

      .ft-nav-btn {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        width: 20px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 34px;
        background: #FFF;
        box-shadow: 0px 4px 31.9px 0px rgba(126, 119, 142, 0.25);
        cursor: pointer;
        z-index: 30;
        transition: transform 0.3s;
      }

      .ft-nav-btn img {
        width: 6px;
        transition: all 0.36s;
      }

      .ft-nav-btn.is_act img {
        transform: rotate(180deg);
      }

      .ft-nav-service {
        position: fixed;
        z-index: 30;
        top: 50%;
        transform: translateY(-50%);
        right: 40px;
        transition: all 0.36s;
      }

      .ft-nsl-li-top {
        width: 70px;
        height: 70px;
        background: #fff;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        transition: all 0.36s;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
      }
      
      .ft-nsl-li-top-icon {
          width: 20px;
          margin: 0 auto;
          margin-bottom: 5px;
      }
      .ft-nsl-li-top-icon img{
        width: 20px;
     }
      .ft-nsl-li-top p {
          color: #1965fd;
          line-height: 1.4;
          font-size: 14px;
          transition: all 0.36s;
      } 
      .ft-nsl-li {
          padding: 10px 0;
          position: relative;
      }
      
      .ft-nsl-li-btm {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding-right: 30px;
          right: 70px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.36s;
      }
      
      .ft-nsl-li-btm-wrap {
          width: 280px;
          border-radius: 12px;
          background: #FFF;
          box-shadow: 0px 4px 35px 0px rgba(0, 0, 0, 0.08);
          display: flex;
      }

      .ft-nlbw-li {
          padding: 30px 38px;
          width: 300px;
          text-align: center;
          position: relative;
      }
      
      .ft-nlbw-li::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          width: 1px;
          height: 90%;
          background: #EEE;
      }
      
      .ft-nlbw-wrap {
          width: 100%;
          position: relative;
      }
      
      .ft-nlbw-wrap-tit p {
          font-size: 18px;
          line-height: 1.45;
          color: #3D3935;
      }
      
      .ft-nlbw-wrap-tit {
          margin-bottom: 10px;
      }
      
      .ft-nlbw-wrap-info p {
          color: #999;
          line-height: 1.45;
          font-size: 16px;
      }
      
      .ft-nlbw-wrap-info {
          margin-bottom: 20px;
      }
      
      .ft-nlbw-wrap-img {
          width: 144px;
          margin: 0 auto;
          margin-bottom: 8px;
      }
      
      .ft-nlbw-wrap-img img {
          width: 100%;
      }
      
      .ft-nlbw-wrap-sutit p {
          color: #999;
          line-height: 1.45;
          font-size: 16px;
      }
      
      .ft-nlbw-wrap-sutit {
          margin-bottom: 20px;
      }
      
      .ft-nlbw-wrap-btm p {
          color: var(--vicolor);
          line-height: 1.4;
          font-weight: bold;
          padding-left: 4px;
      }
      
      
      
      .ft-nlbw-wrap-btm img {
          width: 20px;
          margin-bottom: 1rem;
      }
      
      .ft-nlbw-wrap-btm {
          display: flex;
          justify-content: center;
          align-items: center;
      }
      
      
      /* 鼠标效果 */
          .ft-nsl-li:hover .ft-nsl-li-btm {
              opacity: 1;
              pointer-events: all;
          }
    `;
    document.head.appendChild(style);
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'ft-nav-service';
    document.body.appendChild(this.container);
  }

  createToggleButton() {
    this.toggleBtn = document.createElement('div');
    this.toggleBtn.className = 'ft-nav-btn';
    this.toggleBtn.innerHTML = `
      <img src="${this.config.toggleIcon}" alt="toggle">
    `;
    document.body.appendChild(this.toggleBtn);
  }

  createToolbar() {
    const ul = document.createElement('ul');
    ul.className = 'ft-nav-service-li';

    this.config.items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'ft-nsl-li';

      if (item.type === 'link') {
        li.innerHTML = this.generateLinkItem(item);
      } else if (item.type === 'popup') {
        li.innerHTML = this.generatePopupItem(item);
        this.setupPopupBehavior(li, item);
      } else {
        li.innerHTML = this.generateFunctionItem(item);
        this.setupFunctionBehavior(li, item);
      }

      ul.appendChild(li);
    });

    this.container.appendChild(ul);
  }

  generateLinkItem(item) {
    return `
      <a href="${item.link}" target="_blank" class="ft-nsl-li-top">
        <div class="ft-nsl-li-top-icon">
          <img src="${item.icon || '/assets/nav-iconh.svg'}" alt="${item.text}">
        </div>
        <p>${item.text}</p>
      </a>
    `;
  }
  generateFunctionItem(item) {
    return `
      <div class="ft-nsl-li-top">
        <div class="ft-nsl-li-top-icon">
          <img src="${item.icon || 'assets/nav-icon.svg'}" alt="${item.text}">
        </div>
        <p>${item.text}</p>
      </div>
    `;
  }

  generatePopupItem(item) {
    return `
      <div class="ft-nsl-li-top">
        <div class="ft-nsl-li-top-icon">
          <img src="${item.icon || 'assets/nav-iconh.svg'}" alt="${item.text}">
        </div>
        <p>${item.text}</p>
      </div>
      <div class="ft-nsl-li-btm">
        ${this.generatePopupContent(item.popup)}
      </div>
    `;
  }
  setupFunctionBehavior(li, item) {
    const targetElement = li.querySelector('.ft-nsl-li-top');
    targetElement.addEventListener('click', () => {
      if (typeof item.callback === 'function') {
        item.callback();
      }
    });
  }

  generatePopupContent(popup) {
    return `
      <ul class="ft-nsl-li-btm-wrap">
        <li class="ft-nlbw-li">
          <div class="ft-nlbw-wrap">
            ${
              popup.title
                ? `<div class="ft-nlbw-wrap-tit"><p>${popup.title}</p></div>`
                : ''
            }
            ${
              popup.description
                ? `<div class="ft-nlbw-wrap-info"><p>${popup.description}</p></div>`
                : ''
            }
            ${
              popup.qrCode
                ? `
              <div class="ft-nlbw-wrap-img">
                <img src="${popup.qrCode}" alt="QR Code">
              </div>`
                : ''
            }
            ${
              popup.phone
                ? `
              <div class="ft-nlbw-wrap-btm">
                <img src="${popup.phoneIcon || 'assets/phone-default.svg'}">
                <p>${popup.phone}</p>
              </div>`
                : ''
            }
          </div>
        </li>
      </ul>
    `;
  }

  setupPopupBehavior(li, item) {
    const topElement = li.querySelector('.ft-nsl-li-top');
    const btmElement = li.querySelector('.ft-nsl-li-btm');

    // 桌面端悬停
    topElement.addEventListener('mouseenter', () => {
      btmElement.style.opacity = '1';
      btmElement.style.pointerEvents = 'all';
    });

    topElement.addEventListener('mouseleave', () => {
      btmElement.style.opacity = '0';
      btmElement.style.pointerEvents = 'none';
    });

    // 移动端触摸
    topElement.addEventListener('touchstart', (e) => {
      e.preventDefault();
      btmElement.style.opacity = btmElement.style.opacity === '1' ? '0' : '1';
    });
  }

  setupEventListeners() {
    // 切换按钮点击
    this.toggleBtn.addEventListener('click', () => this.toggle());

    // 窗口大小变化
    window.addEventListener('resize', () => this.handleResponsive());
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.container.style.right = this.isOpen ? '40px' : '-260px';
    this.toggleBtn.classList.toggle('is_act', !this.isOpen);
  }

  handleResponsive() {
    if (window.innerWidth <= this.config.breakpoint) {
      this.container.style.display = 'none';
      this.toggleBtn.style.display = 'none';
    } else {
      this.container.style.display = 'block';
      this.toggleBtn.style.display = 'flex';
    }
  }

  // 公共方法
  updateItems(newItems) {
    this.config.items = newItems;
    this.container.innerHTML = '';
    this.createToolbar();
  }

  destroy() {
    this.container.remove();
    this.toggleBtn.remove();
  }
}


export default FloatToolbar