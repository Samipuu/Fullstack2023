const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let copyGood = { ...state }
      copyGood.good += 1
      return copyGood
    case 'OK':
      let copyOK = { ...state }
      copyOK.ok += 1
      return copyOK
    case 'BAD':
      let copyBad = { ...state }
      copyBad.bad += 1
      return copyBad
    case 'ZERO':
      return initialState
    default: return state
  }

}

export default counterReducer
