import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { RecoilRoot } from "recoil"
import Rodape from "./Rodape"
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes"

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../state/hooks/useSorteador.tsx', () => {
  return {
    // mock compartamento de const algo = useNavigate()
    // - isso é uma função
    // - que retourna uma outra função
    useSorteador: () => mockSorteio
  }
})

jest.mock('react-router-dom', () => {
  return {
    // mock compartamento de const algo = useNavigate()
    // - isso é uma função
    // - que retourna uma outra função
    useNavigate: () => mockNavegacao
  }
})


describe('onde não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)

    const botao = screen.getByRole('button');

    expect(botao).toBeDisabled()
  })
})


describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Julia', 'Catarina'])
  })

  test('a brincadeira pode ser iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole('button');

    expect(botao).not.toBeDisabled()
  })
  test('a brancadeira foi iniciada', () => {
    render(<RecoilRoot><Rodape /></RecoilRoot>)
    const botao = screen.getByRole('button');
    
    fireEvent.click(botao)
    expect(mockNavegacao).toHaveBeenCalled()
    expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
    expect(mockSorteio).toHaveBeenCalledTimes(1)

  })

})