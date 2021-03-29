import Rest from '../utils/rest'
import {useState} from 'react'

const baseURL = 'https://mymoney-thiago-default-rtdb.firebaseio.com/'
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL)

const Movimentacoes = ({match}) => {
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [dataPatch, patch] = usePatch()
  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [removeData, remover] = useDelete()
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value)
  }

  const onChangeValor = evt => {
    setValor(evt.target.value);
  }

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      })
      setDescricao('')
      setValor(0)
      data.refecth()
    }
    setTimeout(() => {
      dataMeses.refecth()
    }, 100)
  }

  const removerMovimentacao = async (id) => {
    await remover(`movimentacoes/${match.params.data}/${id}`)
    data.refecth()
    setTimeout(() => {
      dataMeses.refecth()
    }, 100)
  }

  const alterarPrevisaoEntrada = (evt) => {
    patch(`meses/${match.params.data}`, {previsao_entrada: evt.target.value})
  }

  const alterarPrevisaoSaida = (evt) => {
    patch(`meses/${match.params.data}`, {previsao_saida: evt.target.value})
  }

  return (
    <div className="container">
      <h1>Movimentações</h1>
      {
        !dataMeses.loading && dataMeses.data && <div>
        <span>Previsão de entrada: {dataMeses.data.previsao_entrada} <input type="text" placeholder="0" onBlur={alterarPrevisaoEntrada}/> / Previsão saída: {dataMeses.data.previsao_saida} <input type="text" placeholder="0" onBlur={alterarPrevisaoSaida}/> <br/>
            Entradas: {dataMeses.data.entradas} / Saídas {dataMeses.data.saidas}</span>
        </div>
      }
      <table className='table'>
        <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data.data &&
        Object
          .keys(data.data)
          .map(movimentacao => {
            return (
              <tr key={movimentacao}>
                <td>{data.data[movimentacao].descricao}</td>
                <td>{data.data[movimentacao].valor}</td>
                <td>
                  <button className='btn btn-danger ml-2 float-right' onClick={() => removerMovimentacao(movimentacao)}>-</button>
                </td>
              </tr>
            )
          })
        }
        <tr>
          <td className='form-group'><input className='form-control' type='text' placeholder="Descrição" value={descricao} onChange={onChangeDescricao}/></td>
          <td className='form-group'><input className='form-control' type='text' value={valor} placeholder="0" onChange={onChangeValor}/></td>
          <td>
            <button className='btn btn-primary w-100' onClick={salvarMovimentacao}>+</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Movimentacoes