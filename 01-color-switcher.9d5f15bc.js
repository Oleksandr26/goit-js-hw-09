!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3);t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,e.disabled=!0})),e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.9d5f15bc.js.map
