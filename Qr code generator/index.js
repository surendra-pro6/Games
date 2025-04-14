const qrtext=document.getElementById('qr-text');
const sizes=document.getElementById('sizes');
const generate=document.getElementById('Generate');
const download=document.getElementById('Download');

const qrcontainer =document.querySelector('.qr-body');
let size= sizes.value;

generate.addEventListener('click',(e)=>{
    e.preventDefault();                // It prevent from reloading again and again after every click
    isemptyinput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isemptyinput();
});

download.addEventListener('click',()=>{
    let img=document.querySelector('.qr-body img');

    if(img != null){
        let imgattr= img.getAttribute('src');
        download.setAttribute("href",imgattr);
    }
    else{
        download.setAttribute("href",`${document.querySelector('canvas').toDataURL}`); 
    }
})

function isemptyinput(){
    if(qrtext.value.length >0){
        generateqrcode();
    }else{
        alert("Enter the text or url.");
    }
}

function generateqrcode(){
    qrcontainer.innerHTML="";          // Without this previous qr code not vanish
    new QRCode(qrcontainer, {
        text: qrtext.value,          // Where text comes from
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        // correctLevel : QRCode.CorrectLevel.H
    });
}