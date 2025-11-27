import React, { useRef } from 'react'

type Props = {
  query: string
  setQuery: (v:string)=>void
}

export default function SearchBar({query,setQuery}:Props){
  const ref = useRef<HTMLInputElement|null>(null)
  return (
    <div className="controls">
      <input ref={ref} className="search-input" placeholder="Buscar por título ou sinopse..." value={query} onChange={e=>setQuery(e.target.value)} />
      <button className="btn" onClick={()=>{ if(ref.current) ref.current.focus() }}>Focar</button>
    </div>
  )
}
