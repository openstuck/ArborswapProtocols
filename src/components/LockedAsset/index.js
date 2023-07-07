import React, { useState, useEffect } from 'react'
import Amount from './Amount'
import Preview from './Preview/Preview'
import { getLpInfo } from 'utils/lpInfo'
import { getTokenInfo } from 'utils/tokenInfo'
import { useEthers } from '@usedapp/core'

export default function LockedAssetBase({ asset, type }) {
  const { chainId } = useEthers()
  const [lpInfo, setLpInfo] = useState()
  const [tokenInfo, setTokenInfo] = useState()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (chainId) {

        getLpInfo(asset.info.token).then((info) => {
          setLpInfo(info.data)
        })

        getTokenInfo(chainId, asset.info.token).then((info) => {
          setTokenInfo(info.data)
        })
      
    }
  }, [asset, chainId])

  useEffect(() => {
    if (typeof lpInfo !== 'undefined' && typeof tokenInfo !== 'undefined') {
      console.log('lpInfo', lpInfo)
      console.log('tokenInfo', tokenInfo)
      setReady(true)
      return
    }
  }, [lpInfo, tokenInfo])

  return (
    <div className="w-full flex justify-center">
      <div className="w-full px-4 md:px-0 md:flex md:w-10/12 md:gap-7">
        <div className="w-full md:w-[60%] bg-white dark:bg-dark-1 rounded-[10px]">
          {ready && <Preview type={type} asset={asset} lpInfo={lpInfo} tokenInfo={tokenInfo} />}
        </div>
        <div className="mt-14 md:mt-0 md:w-[40%] ">
          {ready && <Amount type={type} asset={asset} lpInfo={lpInfo} tokenInfo={tokenInfo} />}
        </div>
      </div>
    </div>
  )
}
