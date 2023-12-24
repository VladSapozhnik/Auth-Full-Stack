
const TestForm = () => {
  const createdTrack = (e) => {
    e.preventDefault();
    const questionOne = e.target[0].value;
    const questionTwo = e.target[1].value;
    const questionThree = e.target[2].value;

    const hash = localStorage.getItem("hash");

    if (e.target[0].value.length) {
      fetch('http://localhost:4500/auth/tests', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        "body": JSON.stringify({
            hash: hash,
            questionOne,
            questionTwo,
            questionThree
        })
      }).then(res => res.json()).then(data => console.log(data)) 
    }
  }

  return (
    <div className='bg-dark w-100 h-100 d-flex flex-column justify-content-center'>
      <div className="container">
        <form onSubmit={createdTrack} className="d-flex flex-column align-items-center">
        <h2 className="h2 mb-4">Опитувальник</h2>
          <select className="form-select w-50 mb-3" aria-label="Default select example">
            <option defaultValue="DEFAULT" disabled>Чи сподобалося вам моє рішення завдання?</option>
            <option value="так">Так</option>
            <option value="ні">Ні</option>
            <option value="не дуже">не дуже</option>
          </select>
          <select className="form-select w-50 mb-3" aria-label="Default select example">
            <option defaultValue="DEFAULT" disabled>Яка зарплата в мене буде?</option>
            <option value="300">300$</option>
            <option value="250">250$</option>
            <option value="450">450$</option>
          </select>
          <select className="form-select w-50 mb-3" aria-label="Default select example">
            <option defaultValue="DEFAULT" disabled>Ваша компанія любить тести?</option>
            <option value="так">так</option>
            <option value="ні">ні</option>
            <option value="ти про шо?">ти про шо?</option>
          </select>
          <button type='submit' className="w-25">Send</button>
        </form>
      </div>
    </div>
  )
}

export default TestForm;
