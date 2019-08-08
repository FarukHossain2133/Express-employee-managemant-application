var success =  document.querySelector('#btn-close');
success.addEventListener('click', function(){
   document.getElementById('success').style.display = 'none';
})




function clock(){
      var x = document.querySelector('#clock1');
      var date = new Date();
       var hour = date.getHours();
       var minute = date.getMinutes();
       var seconds = date.getSeconds();
      x.innerHTML = `${hour}:${minute}:${seconds}`;
}
setInterval(clock, 1000)

