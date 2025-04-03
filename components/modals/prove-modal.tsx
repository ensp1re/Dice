"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Loader2, Copy, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { generateProof } from "@/lib/api"

interface ProveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playerScore: number
  botScore: number
  username: string
}

export default function ProveModal({ open, onOpenChange, playerScore, botScore, username }: ProveModalProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [response, setResponse] = useState<Record<string, any>>({})
  const [copied, setCopied] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchProof = async () => {
      try {
        if (open) {
          setStatus("loading")
          setResponse({})
          setCopied(false)
          setShowDetails(false)

          const payload = {
            gameId: `game-id-${Math.floor(Math.random() * 1000000)}`,
            player: username,
            playerScore,
            botScore,
            winner: playerScore > botScore ? username : playerScore === botScore ? "Tie" : "Duck Bot",
          }

          const response = await generateProof(payload)

          if (response && typeof response === "object") {
            setResponse(response)
          } else {
            setStatus("error")
            throw new Error("Invalid response from generateProof")
          }
          setStatus("success")
        }
      } catch (error) {
        console.error("Error resetting state:", error)
        toast({
          title: "Error",
          description: "Failed to reset state",
          variant: "destructive",
          duration: 3000,
        })
      }
    }

    fetchProof()
  }, [open, playerScore, botScore, username])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const formatJSON = (json: Record<string, any>) => {
    return Object.entries(json).map(([key, value]) => (
      <div key={key} className="mb-1">
        <span className="text-[#e83e8c]">"</span>
        <span className="text-[#e83e8c]">{key}</span>
        <span className="text-[#e83e8c]">"</span>
        <span className="text-white">: </span>
        {typeof value === "string" ? (
          <>
            <span className="text-[#2ecc71]">"</span>
            <span className="text-[#2ecc71]">{value}</span>
            <span className="text-[#2ecc71]">"</span>
            {key !== Object.keys(json)[Object.keys(json).length - 1] && <span className="text-white">,</span>}
          </>
        ) : (
          <>
            <span className={typeof value === "boolean" ? "text-[#f39c12]" : "text-[#3498db]"}>{value}</span>
            {key !== Object.keys(json)[Object.keys(json).length - 1] && <span className="text-white">,</span>}
          </>
        )}
      </div>
    ))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 border-0 bg-[#1a1a1a] max-w-md w-[95vw] rounded-lg overflow-hidden shadow-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        {/* Custom Header */}
        <div className="flex items-center h-10 bg-[#e83e8c] px-2 relative">
          <div className="flex space-x-2 absolute left-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <DialogTitle className="flex-1 text-center text-white font-bold">Game Verification</DialogTitle>
        </div>

        {/* Modal Content */}
        <div className="p-5 flex flex-col items-center">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-16 w-16 text-[#e83e8c] animate-spin mb-6" />
              <p className="text-white text-xl font-medium">Proving game results...</p>
              <div className="flex flex-col items-center mt-4 text-center">
                <p className="text-gray-400 text-sm">Generating zero-knowledge proof</p>
                <p className="text-gray-400 text-sm mt-1">Verifying on Succinct network</p>
                <p className="text-gray-400 text-sm mt-1">This may take a few moments</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-[#e2f8f0] flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" strokeWidth={3} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Verification Successful</h3>
              <p className="text-gray-400 mb-5 text-center text-sm">
                Game results have been verified and recorded on-chain
              </p>

              <div className="w-full bg-[#111] rounded-lg p-4 font-mono text-xs overflow-auto max-h-60 mb-4 relative">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-1 rounded hover:bg-gray-800 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <span className="text-green-500 text-xs">Copied!</span>
                    ) : (
                      <Copy size={14} className="text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="text-white">{"{"}</div>
                {formatJSON(
                  showDetails
                    ? response
                    : {
                      verified: response.verified,
                      gameId: response.gameId,
                      player: response.player,
                      playerScore: response.playerScore,
                      botScore: response.botScore,
                      winner: response.winner,
                    },
                )}
                <div className="text-white">{"}"}</div>
              </div>

              <div className="flex w-full justify-between mb-4">
                <button onClick={toggleDetails} className="text-[#e83e8c] text-sm hover:underline focus:outline-none">
                  {showDetails ? "Hide details" : "Show all details"}
                </button>
              </div>

              <div className="flex justify-center w-full mt-2">
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full py-3 rounded-md bg-[#e83e8c] text-white font-medium hover:bg-[#d81b60] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center justify-center mb-5">
                <div className="w-20 h-20 rounded-full bg-[#fee2e2] flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-red-500" strokeWidth={3} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Verification Failed</h3>
              <p className="text-gray-400 mb-5 text-center text-sm">Unable to verify game results</p>

              <div className="w-full bg-[#111] rounded-lg p-4 font-mono text-xs overflow-auto max-h-60 mb-4">
                <div className="text-white">{"{"}</div>
                {formatJSON(response)}
                <div className="text-white">{"}"}</div>
              </div>

              <div className="flex justify-center w-full mt-2">
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full py-3 rounded-md bg-[#e83e8c] text-white font-medium hover:bg-[#d81b60] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

