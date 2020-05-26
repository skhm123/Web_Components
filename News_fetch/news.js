class News extends HTMLElement{
	constructor()
	{
		super();
		this.attachShadow({mode:'open'});
		this.shadowRoot.innerHTML=
		`
		<style>
			#news{
				background: wheat;
    width: 49%;
    margin-left: 25%;
    margin-top: 10%;
   
    visibility:hidden;
			}
			#front{
				visibility:visible;
			}
			img{
				width:71%;
			}
		</style>
		<div id="front">	
		<h1>Topic of the news??</h1>	
		<input type="text" id="topic"> </input>
		<button id="butt">Show News</button>
		</div>
		<div id="news">
			<h1 id="title"></h1>
			<p id="content"></p>
			<a href="" id="link">Go to the Complete News</a>
			<img src="" id="disp" class="fluid-container"></img>
			<button id="close">CLOSE</button>
			<button id="Next">NEXT</button>			

		</div>
		`
	}
	connectedCallback()
	{
		const butt=this.shadowRoot.querySelector("#butt");
		
		butt.addEventListener('click',this._callnews.bind(this));
		const closebutt=this.shadowRoot.querySelector("#close");
		closebutt.addEventListener('click',this._change.bind(this));

	}
	_change()
	{
	this.shadowRoot.querySelector("#front").style.visibility="visible";
		this.shadowRoot.querySelector("#news").style.visibility="hidden";	
	}
	_callnews()
	{

		this.shadowRoot.querySelector("#front").style.visibility="hidden";
		this.shadowRoot.querySelector("#news").style.visibility="visible";
		const text=this.shadowRoot.querySelector("#topic").value;
	fetch("https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q="+text+"&from=2020-05-20&to=2020-05-25&sortBy=popularity&apiKey=d1c1229cc0d9423281a40da35b7460e4"
	,)
   .then(res=>{
	// console.log(res.json());
	return res.json();
}).then(res=>{
	return res.articles;
}).then(articles=>{
	this.shadowRoot.querySelector('#title').innerHTML=articles[0].title;
	this.shadowRoot.querySelector('#content').innerHTML=articles[0].content;
	this.shadowRoot.querySelector('#link').href=articles[0].url;
	this.shadowRoot.querySelector('#disp').src=articles[0].urlToImage;
	let a=1;
	this.shadowRoot.querySelector('#next'),addEventListener("click",()=>{
	this.shadowRoot.querySelector('#title').innerHTML=articles[a].title;
	this.shadowRoot.querySelector('#content').innerHTML=articles[a].content;
	this.shadowRoot.querySelector('#link').href=articles[a].url;
	this.shadowRoot.querySelector('#disp').src=articles[a].urlToImage;
	a=a+1;
	});
	console.log(articles[0].url);
}).catch(err=>{
	console.log("error");
	console.log(err);
});
	}
}
customElements.define("ora-news",News);













