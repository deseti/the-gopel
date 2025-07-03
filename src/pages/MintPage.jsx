import React, { useState, useEffect, useRef } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, decodeEventLog } from "viem";
import HodlGolemAbi from "../abis/HodlGolem.json";

const CONTRACT_ADDRESS = "0x10082db98530D90bEe8252D4Bb7b2F7F3Ec2c3A9";
const MONAD_EXPLORER_TX = "https://testnet.monadexplorer.com/tx/";

const SEGMENTS = [1, 2, 3];
const SEGMENT_COLORS = ["#4f46e5", "#9F5FFF", "#4338ca"];

function getRotationForResult(result) {
  // 1: 0deg, 2: 120deg, 3: 240deg (pointer always at top)
  if (result === 1) return 0;
  if (result === 2) return 120;
  if (result === 3) return 240;
  return 0;
}

const MintPage = () => {
  const { isConnected } = useAccount();
  const { data: hash, writeContract, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, isError, data: receipt } = useWaitForTransactionReceipt({ hash, enabled: !!hash });

  const [status, setStatus] = useState("");
  const [spinResult, setSpinResult] = useState(null);
  const [error, setError] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);
  const [showSpin, setShowSpin] = useState(false);
  const [showMint, setShowMint] = useState(false);
  const spinWheelRef = useRef(null);

  useEffect(() => {
    if (isPending) {
      setStatus("Confirm in wallet...");
      setError("");
      setSpinResult(null);
      setShowSpin(false);
      setShowMint(false);
    }
  }, [isPending]);

  useEffect(() => {
    if (isConfirming) {
      setStatus("Spinning... Waiting for confirmation...");
    }
    if (isSuccess && receipt) {
      let found = false;
      for (const log of receipt.logs) {
        try {
          const decodedLog = decodeEventLog({
            abi: HodlGolemAbi.abi,
            data: log.data,
            topics: log.topics,
          });
          if (decodedLog.eventName === "GolemSpin") {
            const quantity = Number(decodedLog.args.quantityMinted);
            setSpinResult(quantity);
            setStatus("");
            setShowSpin(true);
            setShowMint(false);
            // Start spin animation
            setTimeout(() => {
              setIsSpinning(true);
              // After animation, show result
              setTimeout(() => {
                setFinalRotation(360 * 5 + getRotationForResult(quantity));
                setTimeout(() => {
                  setIsSpinning(false);
                  setShowMint(true);
                  setStatus(`Congratulations! You received ${quantity} Hodl Golem${quantity > 1 ? "s" : ""}!`);
                }, 2200);
              }, 200); // slight delay before spin
            }, 400);
            found = true;
            break;
          }
        } catch (e) {}
      }
      if (!found) {
        setStatus("Success! But could not read spin result from event logs.");
      }
    }
    if (writeError || isError) {
      setError((writeError?.shortMessage || writeError?.message || "Transaction failed or was rejected.") + (isError ? " (Receipt error)" : ""));
      setStatus("");
      setShowSpin(false);
      setShowMint(false);
    }
  }, [isConfirming, isSuccess, isError, receipt, writeError]);

  const handleSpinAndMint = () => {
    setFinalRotation(0);
    setSpinResult(null);
    setShowSpin(false);
    setShowMint(false);
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: HodlGolemAbi.abi,
      functionName: "spinAndMint",
      value: parseEther("0.1"),
    });
  };

  return (
    <div className="page-container">
      <div className="mint-card">
        <h2>Hodl Spinner</h2>
        <img src="/icon.png" alt="NFT Preview" style={{ width: 90, height: 90, borderRadius: 16, margin: "0 auto 1.2rem auto", boxShadow: "0 2px 12px #0003" }} />
        <p className="mint-subtext">Pay 0.1 MON to spin and win 1, 2, or 3 Hodl Golems!</p>
        <div className="mint-area">
          <button
            className="mint-button"
            disabled={!isConnected || isPending || isConfirming || isSpinning}
            onClick={handleSpinAndMint}
          >
            {isPending ? "Confirm in wallet..." : isConfirming ? "Processing..." : isSpinning ? "Spinning..." : "Pay & Spin (0.1 MON)"}
          </button>
        </div>
        {/* Spin Wheel Animation */}
        {showSpin && (
          <div style={{ margin: "32px 0 18px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ position: "relative", width: 220, height: 220 }}>
              {/* Wheel */}
              <svg
                ref={spinWheelRef}
                width={220}
                height={220}
                style={{
                  transition: isSpinning ? "transform 2.2s cubic-bezier(.25,1.5,.5,1)" : "none",
                  transform: `rotate(${finalRotation}deg)`
                }}
              >
                {SEGMENTS.map((num, i) => {
                  const startAngle = (i * 120) - 30;
                  const endAngle = ((i + 1) * 120) - 30;
                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                  const x1 = 110 + 100 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 110 + 100 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 110 + 100 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 110 + 100 * Math.sin((endAngle * Math.PI) / 180);
                  return (
                    <path
                      key={num}
                      d={`M110,110 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`}
                      fill={SEGMENT_COLORS[i]}
                      stroke="#fff"
                      strokeWidth={3}
                    />
                  );
                })}
                {/* Numbers */}
                {SEGMENTS.map((num, i) => {
                  const angle = (i * 120) + 30;
                  const x = 110 + 65 * Math.cos((angle * Math.PI) / 180);
                  const y = 110 + 65 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <text
                      key={num}
                      x={x}
                      y={y + 10}
                      textAnchor="middle"
                      fontSize="38"
                      fontWeight="bold"
                      fill="#fff"
                      style={{ filter: "drop-shadow(0 2px 6px #0008)" }}
                    >
                      {num}
                    </text>
                  );
                })}
              </svg>
              {/* Pointer */}
              <div style={{
                position: "absolute",
                left: "50%",
                top: -18,
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderBottom: "32px solid #FFD600",
                zIndex: 2
              }} />
            </div>
          </div>
        )}
        {/* Mint Result & Status */}
        <div className="status-area">
          {status && !error && <div className="status-text success">{status}</div>}
          {error && <div className="status-text error">{error}</div>}
          {hash && (
            <a
              href={`${MONAD_EXPLORER_TX}${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              View Transaction
            </a>
          )}
        </div>
        {/* Mint Button after spin */}
        {showMint && spinResult && (
          <button
            className="mint-button"
            style={{ marginTop: 18, background: "#16a34a" }}
            disabled
          >
            Minted {spinResult} Hodl Golem{spinResult > 1 ? "s" : ""}!
          </button>
        )}
      </div>
    </div>
  );
};

export default MintPage;