export const scripts = [
	{
		children: `setTimeout(()=>{const s=document.createElement('script');s.src='https://telegram.org/js/telegram-web-app.js';document.querySelector('body').appendChild(s)},2000)`,
	}
]