
  (function (window, document) {
    'use strict';
    var baseUrl = 'http://localhost:3000';
var styleBaseUrl = 'http://localhost:8080';
var applyBtn;
var toggleTimeoutId;

var widget = (function () {
  var modalEl;
  var iframeEl;
  var queryString;
  var pageUrl;
  
  function createIframe() {
    queryString = queryString || applyBtn.href.replace(/^.+\?/, '');
    pageUrl = pageUrl || (baseUrl + '/apply-embed/?' + queryString);
    iframeEl = document.createElement('IFRAME');
    iframeEl.src = pageUrl;
    iframeEl.setAttribute('frameborder', '0');
    iframeEl.width = '100%';
    iframeEl.height = '100%';
    return iframeEl;
  }

  function createModal() {
    modalEl = document.createElement('DIV');
    modalEl.className = 'lnz-modal';

    var modalContentEl = document.createElement('DIV');
    modalContentEl.className = 'lnz-modal__content';
    modalContentEl.appendChild(createIframe());

    var modalCloseEl = document.createElement('A');
    modalCloseEl.className = 'lnz-modal__close';

    modalEl.appendChild(modalContentEl);
    modalEl.appendChild(modalCloseEl);
    return modalEl;
  }

  function toggleModal() {
    var isHidden = false;
    
    if (toggleTimeoutId) {
      clearTimeout(toggleTimeoutId);
    }

    if (modalEl) {
      isHidden = modalEl.classList.contains('lnz-modal_hidden');
      modalEl.classList.toggle('lnz-modal_hidden', !isHidden);
      iframeEl.src = !isHidden ? '' : pageUrl;
      return;
    }

    document.body.appendChild(createModal());

    modalEl.addEventListener('click', function (event) {
      if (['lnz-modal', 'lnz-modal__close'].indexOf(event.target.className) !== -1) {
        widget.toggleModal();
      }
    });
  }

  return {
    toggleModal: toggleModal,
  };
}());

function appendStyleEl() {
  var linkEl = document.createElement('LINK');
  linkEl.rel = 'stylesheet';
  linkEl.href = styleBaseUrl + '/embed/embed.css';
  document.head.appendChild(linkEl);
}

function handleButtonClick(event) {
  event.preventDefault();
  widget.toggleModal();
}

function handleMessage(event) {
  if (event.origin !== baseUrl) {
    return;
  }

  if (event.data.type === 'FORM_SUBMIT_SUCCESS') {
    toggleTimeoutId = setTimeout(widget.toggleModal, 2000);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  applyBtn = document.querySelector('.loanz-apply-widget');

  if (!applyBtn) {
    return;
  }

  appendStyleEl();
  applyBtn.addEventListener('click', handleButtonClick);
  window.addEventListener('message', handleMessage);
});
  }(window, document));
  