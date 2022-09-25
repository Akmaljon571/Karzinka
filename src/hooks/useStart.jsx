import { useContext } from "react";
import { State } from '../content/start'

function useStart() {
   const {setKirish, kirish, baza, setBaza, count, setCount, renderSerach, setRenderSerach, render, setRender, admin, setAdmin} = useContext(State)

   return {setKirish, kirish, baza, setBaza, count, setCount, renderSerach, setRenderSerach, render, setRender, admin, setAdmin}
  
}

export default useStart;