import { useCallback, useEffect, useState } from 'react'

/*
  @param {function} asyncFunction
  @param {boolean} shouldRun
*/

function useRequest<T = unknown>(
  asyncFunction: () => Promise<unknown>,
  shouldRun: boolean
) {
  const [result, setResult] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'resolved' | 'error'
  >('idle')

  const run = useCallback(() => {
    setResult(null)
    setError(null)
    setStatus('pending')

    return asyncFunction()
      .then(res => {
        setStatus('resolved')
        setResult(res as T)
      })
      .catch(err => {
        setStatus('error')
        setError(err)
      })
  }, [asyncFunction])

  useEffect(() => {
    if (shouldRun) run()
  }, [shouldRun, run])

  return { run, result, error, status }
}

export default useRequest
