import { useSelector,useDispatch } from "react-redux"
import { increment,decrement, reset, incByAmount} from "./counterSlice"
import { useState } from "react"

const Counter = () => {
    const count = useSelector((state)=>state.counter.count)
    const dispatch=useDispatch()
    const [incAmount,setIncAmount]=useState(0)
    const addValue=Number(incAmount)||0
    const resetAll=()=>{
        setIncAmount(0)
        dispatch(reset())
    }
  return (
    <section>
        <p>{count}</p>
        <div>
            <button onClick={()=>dispatch(increment())} >+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
            <button onClick={resetAll}>reset</button>
            <button onClick={()=>dispatch(incByAmount(addValue))}>Add This Amount</button>
        </div>
        <input
            type="text"
            value={incAmount}
            onChange={(e)=>setIncAmount(e.target.value)}
        />
    </section>
  )
}

export default Counter