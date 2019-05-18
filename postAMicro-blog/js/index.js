class publishArticle{
    constructor (selector){
        this.box = document.querySelector(selector);
        console.log(this.box);
        this.showCenter(this.box);
        this.submitBtn = this.box.querySelector('#submitBtn');
        this.btn = document.querySelector('#btn');
        this.importText= this.box.querySelector('#importText');
        this.text=this.box.querySelector('#text');
		this.cancelBtn = this.box.querySelector('#cancelBtn');
		this.delBtn = this.box.querySelector('#delBtn');
		
        this.bindBtn();
        this.ul = document.querySelector('ul');
        console.log(this.ul);
        
    }





    //设置属性
    setStyle (obj, attrJson) {
		for(var key in attrJson) {
			obj.style[key] = attrJson[key];
		}
    }


    getBodySize () {
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		}
	}
    
    showCenter (obj) {
		
		this.setStyle(obj, {
			opacity: 0,

			position: "absolute"
		})
		
		let _this = this;
		window.onresize = (function center () {
        let left = (_this.getBodySize().width - obj.offsetWidth) / 2 + "px",
			top = (_this.getBodySize().height - obj.offsetHeight) / 2 + "px";
			
			
			_this.setStyle(obj, {left, top});
			return center;
		})();			

    }
    bindBtn() {
		this.cancelBtn.onclick = () => {
		this.box.style.opacity= 0;	
		document.body.removeChild(this.modal);
		}
		this.delBtn.onclick = () => {
		this.box.style.opacity= 0;	
		document.body.removeChild(this.modal);
		}
        this.btn.onclick = () => {
			this.box.style.opacity= 1;
			this.modal = document.createElement('div');
			this.modal.className = "modal";
			document.body.appendChild(this.modal);
        }

        this.submitBtn.onclick = () => {
			this.outPutEvent ();
			document.body.removeChild(this.modal);
		
        }
		
		document.oncontextmenu = function (e) {
			var e = e || event ;
			var target = e.target || e.srcElement
			this.ol = document.createElement('ol');	
			
			
				
			
			
			this.ol.innerHTML = "<li>增加</li><li class='del'>删除</li><li>修改</li>";
			
			this.ol.style.left = e.clientX + "px";
			this.ol.style.top = e.clientY + "px";
			document.body.appendChild(this.ol);
			
			
			if(e.preventDefault){
				e.preventDefault()
			}else{
				window.event.returnValue = false;
			}
			
			
			
			
			this.del = document.querySelector('.del')
			this.del.onclick = () => {
				target.remove();
				document.body.removeChild(this.ol);
			}
			
			
		}
		
		
		
		
    }
   
    outPutEvent () {

        this.toDate = new Date();
        
        this.year= this.toDate.getFullYear();
		this.month = this.toDate.getMonth();
		this.day = this.toDate.getDay();
		this.hours = this.toDate.getHours();
		this.minutes =this.toDate.getMinutes();
		this.seconds = this.toDate.getSeconds();
		
            console.log(this.year )
        
        if(this.text.value===""||this.importText.value===''){
            alert('请输入')
        }else{

           let li =  document.createElement('li');
		   li.className="ac";
            this.ul.appendChild(li);
            li.innerHTML =  `${this.text.value}在${ this.year}年${ this.month}月${ this.day}日${ this.hours}时${ this.minutes}分${ this.seconds}秒发布的消息是:${this.importText.value}` ;
            this.box.style.opacity= 0;
            
				
        }
    }
	
	rightEvent () {
		
	}
	

}
new publishArticle ('#box');
  