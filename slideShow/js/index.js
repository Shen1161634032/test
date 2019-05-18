class slideShow {

        constructor (selector){
            this.box = document.querySelector(selector);
            this.ul =this.box.querySelector('.banner');
            this.lis = this.ul.children;
           
            this.left = this.box.querySelector('#left');
            this.right = this.box.querySelector('#right');
            this.btn = this.box.querySelector('.btn');
            this.ac=0;
            this.lastAc = 0;
            this.arr = [];
            this.timer = null;
            this.GenerateBtn ();
            this.BtnSwitch();
            this.autoPaly ();
            this.go();
            this.stop();

        }

        //按照图片的多少写入按钮
         GenerateBtn () {
       
            for(let i = 0 ; i<this.lis.length-2;i++){
                this.li =  document.createElement('li');
                this.li.innerHTML = i+1;
                if(i===0)this.li.className="ac";
                this.arr.push(this.li);
                this.btn.appendChild(this.li);

            }
        } 

        //给每个按钮绑定事件
                 BtnSwitch(){
					for(let i=0;i<this.arr.length;i++){
						this.arr[i].onclick=()=>{
							this.ac=i;
							this.change();
							this.lastAc = this.ac ;
						}
                    }
                    //左键
                    this.left.onclick=()=>{
						this.ac--;
						if(this.ac<0){
							this.ac=this.lis.length-3;
							this.ul.style.top=-(this.arr.length+1)*480+"px";
						}
                        this.change()
						this.lastAc=this.ac;
                    }
                    
                    //右键
                    this.right.onclick= () =>{
						this.ac++;
						if(this.ac==this.lis.length-2){
							this.ac=0;
							this.ul.style.top=0;
						}
						this.change();
						this.lastAc=this.ac;
					}


                 }
                
            change(){
            this.arr[this.lastAc].classList.remove("ac");
            this.arr[this.ac].classList.add("ac");
            
            this.move(this.ul,"top",-(this.ac+1)*480)
            }    
        
        
             move(obj,attr,end){
                clearInterval(obj.timer);
            
                let start = parseInt(this.getStyle(obj, attr));
            
                    obj.timer = setInterval(function () {
                        let distance = end - start;
                        
                        let speed = distance > 0 ? Math.ceil(distance / 5) : Math.floor(distance / 5);
                        start += speed;
                        obj.style[attr] = start + "px";
                        if(start === end) {
                            clearInterval(obj.timer);
                    
                        }   
                    }, 50);
            }  
            
            getStyle(obj, attr) {

                return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
            }
            autoPaly(){
				this.timer=setInterval(function(){
                    this.right.onclick();
						}.bind(this),3000)
				}
				stop(){
					this.box.onmouseenter=()=>{
                    clearInterval(this.timer);
                    this.left.style.display = "block"; 
                    this.right.style.display = "block"; 

					}
				}
				go(){
					this.box.onmouseleave=()=>{
                    this.autoPaly();
                    this.left.style.display = "none"; 
                    this.right.style.display = "none";
					}
				}
}
        new slideShow ("#box");