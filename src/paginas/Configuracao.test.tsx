import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";

jest.mock('react-router-dom', () => {
  return {
    // mock compartamento de const algo = useNavigate()
    // - isso é uma função
    // - que retourna uma outra função
    useNavigate: () => mockNavegacao
  }
})

const mockNavegacao = jest.fn()

describe('a pagina de configuração', () => {

  test('deve ser renderizada corretamente', () => {

    const { container } = render(
      <RecoilRoot>
        <Configuracao />
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot()
  })
})