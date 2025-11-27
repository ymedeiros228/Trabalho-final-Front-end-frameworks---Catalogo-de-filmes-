
import React from 'react';

export default function About(){
  return (
    <main style={{ maxWidth:"800px", margin:"0 auto", textAlign:"center", padding:"2rem" }}>
      <h1 style={{ marginBottom:"1.5rem" }}>Sobre Nós</h1>

      <p style={{
        textAlign:"justify",
        lineHeight:"1.7",
        marginBottom:"2rem",
        fontSize:"1.05rem"
      }}>
        Somos um grupo de estudantes do curso de <strong>Ciência da Computação</strong>, atualmente no
        <strong> 4º período</strong> da UNINASSAU. Este projeto foi desenvolvido como parte da
        <strong> Avaliação AV2</strong> da disciplina de <strong>Front-end</strong>. Nosso objetivo foi criar uma
        aplicação moderna, funcional e visualmente atraente, aplicando conceitos reais usados no desenvolvimento
        de interfaces profissionais. Acreditamos que a prática é essencial para evoluir, e este trabalho representa
        nossa dedicação e aprendizado ao longo do semestre.
      </p>

      <img 
        src="/uninassau.png" 
        alt="UNINASSAU"
        style={{ width:"220px", opacity:0.9 }}
      />
    </main>
  );
}
