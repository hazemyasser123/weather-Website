console.log('clien side JS is loaded')

// fetch('https://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data.puzzle)
//     })
// })

// const Input = document.getElementById('Input')
// const Button = document.getElementById('Button')

// function FetchData() {
    // e.preventDefault();
    // }
    
    const weatherForm = document.querySelector('form')
    const Input = document.querySelector('input')
    const para = document.querySelectorAll('p')
    
    weatherForm.addEventListener('submit' , (e) => {
        e.preventDefault();
        para[2].textContent = ''
        para[1].textContent = 'Loading...';
        fetch(`/weather?address=${Input.value}`).then((res) => {
            res.json().then((data) => {
                if(data.error){
                    para[1].textContent = '';
                    para[2].textContent = data.error
                } else{
                    para[1].textContent = 'the weather at ' + data.city + "," + data.location + " is " + data.forecast + "℃";
                    para[2].textContent = ''
                    
                }
            })
        })
})