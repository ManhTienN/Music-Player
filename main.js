const $ =document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const heading= $('header h2')
const cdThumb= $('.cd-thumb')
const audio= $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress =$('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')
const app={
    isPlaying: false,
    currentIndex: 0,
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    songs:[{
        name:'Chỉ Riêng Mình Ta',
        singer:'Trung Quang',
        path:'./music/y2mate.com - CHỈ RIÊNG MÌNH TA  TRUNG QUANG  LIVE IN MÂY LANG THANG ĐÀ LẠT.mp3',
        image:'./img/ChiriengMinhTa.jfif'
    },
    {
        name:'Hoa Trinh Nữ',
        singer:'Trung Quang',
        path:'./music/y2mate.com - HOA TRINH  NỮ  TRUNG QUANG  LIVE IN DỐC MỘNG MƠ.mp3',
        image:'./img/HoaTrinhNu.jfif'
    },
    {
        name:'Biển Tình',
        singer:'Trung Quang',
        path:'./music/y2mate.com - LK BIỂN TÌNH  TRUNG QUANG  LYRIC VIDEO.mp3',
        image:'./img/BienTinh.jfif'
    },
    {
        name:'Ngẫu Hứng Lý Qua Cầu',
        singer:'Trung Quang',
        path:'./music/y2mate.com - NGẪU HỨNG LÝ QUA CẦU   TRUNG QUANG   MÂY LANG THANG ĐÀ LẠT.mp3',
        image:'./img/NgauHunglyQuaCau.jfif'
    },
    {
        name:'Nối Lại Tình Xưa',
        singer:'Trung Quang',
        path:'./music/y2mate.com - NỐI LẠI TÌNH XƯA  TRUNG QUANG FT PHƯƠNG MỸ CHI  MUSIC FOR LOVE 2020.mp3',
        image:'./img/NoiLaiTinhXua.jfif'
    },
    {
        name:'Phượng Buồn',
        singer:'Trung Quang',
        path:'./music/y2mate.com - PHƯỢNG BUỒN  TRUNG QUANG  VOL 4  CHỜ ĐÔNG.mp3',
        image:'./img/PhuongBuon.jfif'
    },
    {
        name:'Thao Thức Vì Em',
        singer:'Trung Quang',
        path:'./music/y2mate.com - THAO THỨC VÌ EM  TRUNG QUANG.mp3',
        image:'./img/ThaoThucViEm.jfif'
    },
    {
        name:'Trộm Nhìn Nhau',
        singer:'Trung Quang',
        path:'./music/y2mate.com - TRỘM NHÌN NHAU  TRUNG QUANG.mp3',
        image:'./img/TromNhinNhau.jfif'
    }
    ],

    render:function(){
        const htmls = this.songs.map(song=>{
            return `
            <div class="song">
                    <div >
                      <div class="thumb" style="background-image: url('${song.image}');"></div>
                    </div>
                    <div class="body">
                        <h3 class="name">${song.name}</h3>
                        <small class="band">${song.singer}</small>
                    </div>
                    <div class="option">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                `
        })
        $('.playlist').innerHTML =htmls.join('');
    },
    handleEvent: function(){
        const _this = this;
        const cdWith = cd.offsetWidth;
        //Xử lý CD quay
        const cdThumbAnimate= cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ]
            ,{
                duration: 20000,
                iterations: Infinity,
            }
        )
        cdThumbAnimate.pause();
        document.onscroll =function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWith = cdWith - scrollTop
            
            cd.style.width = newCdWith > 0 ? newCdWith + 'px' : 0
            cd.style.opacity = newCdWith / cdWith;
        }
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        }
        nextBtn.onclick = function(){
            _this.nextSong();
            audio.play();
            audio.ontimeupdate();
        }
        prevBtn.onclick = function(){
            this.prevSong();
            audio.play();
            audio.ontimeupdate();
        }
        randomBtn.onclick
        //Xử lý khi ấn play
        audio.onplay = function(){
            cdThumbAnimate.play();
            _this.isPlaying = true;
            player.classList.add('playing');
        }
        //Xử lý khi ấn Pause
        audio.onpause = function(){
            cdThumbAnimate.pause();
            _this.isPlaying = false;
            player.classList.remove('playing');
        }
        //Xử lý thanh progress
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPecent = Math.floor(audio.currentTime / audio.duration *100);
                progress.value = progressPecent;
            }
        }
        //Xử lý khi tua
        progress.onchange = function(e){
            const seekTime = audio.duration/ 100* e.target.value;
            audio.currentTime = seekTime;
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong:function(){
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length-1){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong:function(){
        this.currentIndex --;
        if(this.currentIndex <=0){
            this.currentIndex = this.songs.length;
        }
        this.loadCurrentSong();
    },
    start:function(){
        //Định nghĩa các thuộc tính trong object
        this.defineProperties();
        //Lắng nghe và xử lý các sự kiện (DOM events)
        this.handleEvent();

        this.loadCurrentSong();
        this.render();
    }
}
app.start()

