import { BUNDLR_CURRENCY, POLYGON_CHAIN_ID } from '@/constants';
import { useAppStore } from '@/store/app';
import useEthersWalletClient from '@/utils/hooks/useEthersWalletClient';
import useIsMounted from '@/utils/hooks/useIsMounted';
import { WebBundlr } from '@bundlr-network/client';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { formatEther, parseEther, parseUnits } from 'viem';
import {
  useAccount,
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction
} from 'wagmi';
import { Button } from '../UI/Button';
import { logger } from '@/logger';
import { Tooltip } from '../UI/Tooltip';
import { RiRefreshFill } from 'react-icons/ri';
import ChevronUpOutline from '../UI/Icons/ChevronUpOutline';
import ChevronDownOutline from '../UI/Icons/ChevronDownOutline';
import { Input } from '../UI/Input';

const BundlrInfo = () => {
  const { address } = useAccount();
  const { data: signer } = useEthersWalletClient();

  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const getBundlrInstance = useAppStore((state) => state.getBundlrInstance);
  const bundlrData = useAppStore((state) => state.bundlrData);
  const setBundlrData = useAppStore((state) => state.setBundlrData);

  const { sendTransactionAsync } = useSendTransaction();
  const { config } = usePrepareSendTransaction();

  const { mounted } = useIsMounted();
  const { data: userBalance } = useBalance({
    address,
    chainId: POLYGON_CHAIN_ID,
    watch: true
  });

  const estimatePrice = async (bundlr: WebBundlr) => {
    if (!uploadedVideo.stream) {
      return toast.error(`Upload cost estimation failed`);
    }
    return await bundlr.utils.getPrice(
      BUNDLR_CURRENCY,
      uploadedVideo.stream?.size
    );
  };

  const fetchBalance = async (bundlr?: WebBundlr) => {
    try {
      const instance = bundlr || bundlrData.instance;
      if (address && instance) {
        const balance = await instance.getBalance(address);
        const price = await estimatePrice(instance);
        setBundlrData({
          balance: formatEther(BigInt(balance.toString())),
          estimatedPrice: formatEther(BigInt(price.toString()))
        });
      }
    } catch (error) {
      logger.error('[Error Fetch Bundlr Balance]', error);
    }
  };

  const initBundlr = async () => {
    if (signer && address && !bundlrData.instance) {
      const bundlr = await getBundlrInstance(signer);
      if (bundlr) {
        setBundlrData({ instance: bundlr });
        await fetchBalance(bundlr);
      }
    }
  };

  useEffect(() => {
    if (signer && mounted) {
      initBundlr().catch((error) => logger.error('[Error Init Bundlr]', error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, mounted]);

  useEffect(() => {
    if (bundlrData.instance && mounted) {
      fetchBalance(bundlrData.instance).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundlrData.instance]);

  const depositToBundlr = async () => {
    if (!bundlrData.instance) {
      return await initBundlr();
    }
    if (!bundlrData.deposit) {
      return toast.error(`Enter deposit amount`);
    }
    const depositAmount = parseFloat(bundlrData.deposit);
    const value = parseUnits(depositAmount.toString() as `${number}`, 9);
    if (!value || Number(value) < 1) {
      return toast.error(`Invalid deposit amount`);
    }
    if (
      userBalance?.formatted &&
      parseFloat(userBalance?.formatted) < depositAmount
    ) {
      return toast.error(
        `Insufficient funds in your wallet, you have ${userBalance?.formatted} MATIC.`
      );
    }
    setBundlrData({ depositing: true });

    // TEMP:START: override bundlr functions for viem
    bundlrData.instance.currencyConfig.getFee = async (): Promise<any> => {
      return 0;
    };
    bundlrData.instance.currencyConfig.sendTx = async (
      data
    ): Promise<string> => {
      const { hash } = await sendTransactionAsync(data);
      return hash;
    };
    bundlrData.instance.currencyConfig.createTx = async (
      amount: `${number}`,
      to: `0x${string}`
    ): Promise<{ txId: string | undefined; tx: any }> => {
      config.to = to;
      config.value = parseEther(amount.toString() as `${number}`, 'gwei');
      return { txId: undefined, tx: config };
    };
    // TEMP:END: override bundlr functions for viem

    try {
      const fundResult = await bundlrData.instance.fund(value.toString());
      if (fundResult) {
        toast.success(
          `Deposit of ${formatEther(
            BigInt(fundResult?.quantity)
          )} is done and it will be reflected in few seconds.`
        );
      }
    } catch (error) {
      toast.error(`Failed to deposit storage balance`);
      logger.error('[Error Bundlr Deposit]', error);
    } finally {
      await fetchBalance();
      setBundlrData({
        deposit: null,
        showDeposit: false,
        depositing: false
      });
    }
  };

  const onRefreshBalance = async () => {
    if (!bundlrData.instance) {
      return await initBundlr();
    }
    await fetchBalance();
  };

  return (
    <div className="mt-4 w-full space-y-2">
      <div className="flex flex-col">
        <div className="inline-flex items-center justify-between rounded text-sm font-medium opacity-80">
          <span className="flex items-center space-x-1.5">
            <span>Your Storage Balance</span>
            <Tooltip content="Refresh balance" placement="top">
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => onRefreshBalance()}
              >
                <RiRefreshFill className="h-3 w-3" />
              </button>
            </Tooltip>
          </span>
          <span>
            <button
              type="button"
              onClick={() =>
                setBundlrData({
                  showDeposit: !bundlrData.showDeposit
                })
              }
              className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 focus:outline-none dark:bg-gray-900"
            >
              <span className="px-0.5 text-xs">Deposit</span>
              {bundlrData.showDeposit ? (
                <ChevronUpOutline className="ml-1 h-3 w-3" />
              ) : (
                <ChevronDownOutline className="ml-1 h-3 w-3" />
              )}
            </button>
          </span>
        </div>
        <div className="flex justify-between">
          {bundlrData.balance !== '0' ? (
            <span className="text-lg font-medium">{bundlrData.balance}</span>
          ) : (
            <span className="mt-[6px] h-[22px] w-1/2 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
      </div>
      {bundlrData.showDeposit && (
        <div>
          <div className="mb-2 inline-flex flex-col text-sm font-medium opacity-80">
            Amount to deposit (MATIC)
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder={userBalance?.formatted}
              className="py-1.5 md:py-2"
              autoComplete="off"
              min={0}
              value={bundlrData.deposit || ''}
              onChange={(e) => {
                setBundlrData({ deposit: e.target.value });
              }}
            />
            <Button
              type="button"
              size="md"
              loading={bundlrData.depositing}
              onClick={() => depositToBundlr()}
            >
              Deposit
            </Button>
          </div>
        </div>
      )}
      <div>
        <span className="inline-flex flex-col text-sm font-medium opacity-80">
          Estimated Cost to Upload
        </span>
        <div className="flex justify-between">
          {bundlrData.estimatedPrice !== '0' ? (
            <div className="text-lg font-medium">
              {bundlrData.estimatedPrice}
            </div>
          ) : (
            <span className="mt-[6px] h-[22px] w-1/2 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          )}
        </div>
      </div>
    </div>
  );
};

export default BundlrInfo;
