import { useState } from "react";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";
import Card from "../componentes/Card";

import "./Sorteio.css"

const Sorteio = () => {

  const participantes = useListaDeParticipantes()

  const [participanteDaVez, setParticipanteDaVez] = useState('')
  const [amigoSecreto, setAmigoSecreto] = useState('')

  const resultado = useResultadoSorteio()

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (resultado.has(participanteDaVez)) {
      setAmigoSecreto(resultado.get(participanteDaVez)!)
      setTimeout(() => {
        setAmigoSecreto("")
      }, 5000)
    }
  }

  return (
    <Card>
      <section className="sorteio">
        <form onSubmit={sortear}>
          <select
            required
            name="participanteDavez"
            id="participanteDavez"
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {participantes.map(participante => <option key={participante}>{participante}</option>)}        
          </select>
          <button className="botao-sortear">Sortear</button>
        </form>

        {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
      </section>
      <footer className="sorteio">
        <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
      </footer>
    </Card>
  )
}

export default Sorteio;