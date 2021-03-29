import {Link} from 'react-router-dom'
import Rest from '../../utils/rest';

const baseURL = 'https://mymoney-thiago-default-rtdb.firebaseio.com/'
const {useGet, useDelete} = Rest(baseURL)

const Meses = () => {
  const data = useGet('meses')

  const [removeData, remover] = useDelete()

  const removerMes = async (id) => {
    await remover(`meses/${id}`)
    data.refecth()
  }

  if (data.loading) {
    return data.loading && <span>Carregando...</span>
  }
  if (data.data && Object.keys(data.data).length > 0) {
    return (
      <table className='table'>
        <thead>
        <tr>
          <th>Mês</th>
          <th>Previsão entrada</th>
          <th>Entrada</th>
          <th>Previsão saída</th>
          <th>Saída</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          Object
            .keys(data.data)
            .map(mes => {
              return (
                <tr key={mes}>
                  <td><Link to={`/movimentacoes/${mes}`}>Mês</Link></td>
                  <td>{data.data[mes].previsao_entrada}</td>
                  <td>{data.data[mes].entradas}</td>
                  <td>{data.data[mes].previsao_saida}</td>
                  <td>{data.data[mes].saidas}</td>
                  <td>
                    <button onClick={removerMes(mes)}>remover</button>
                  </td>
                </tr>
              )
            })
        }
        </tbody>
      </table>
    )
  }
  return null
}

export default Meses