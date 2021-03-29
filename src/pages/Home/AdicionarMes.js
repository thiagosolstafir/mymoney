import {useState, useRef} from 'react'
import {Redirect} from 'react-router-dom'

const minAno = 2020
const maxAno = 2022
const AdicionarMes = () => {
  const refAno = useRef();
  const refMes = useRef();
  const [redir, setRedir] = useState('')
  const anos = []
  const meses = []
  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    meses.push(i)
  }
  const zeroPad = num => {
    if (num < 10) {
      return '0' + num
    }
    return num
  }
  const verMes = () => {
    setRedir(refAno.current.value + '-' + refMes.current.value)
  }
  if (redir !== '') {
    return <Redirect to={'/movimentacoes/' + redir}/>
  }
  return (
    <>
      <h2>Adicionar mês</h2>
      <div className='form-group form-inline'>
        <select className='form-control w-25 mr-2' ref={refAno}>
          {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
        </select>
        <select className='form-control w-25 mr-2' ref={refMes}>
          {meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)}
        </select>
        <button className='btn btn-success' onClick={verMes}>Adicionar mês</button>
      </div>
    </>
  )
}

export default AdicionarMes
