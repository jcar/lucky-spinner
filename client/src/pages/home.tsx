import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Participant, WheelParticipant, SpinResult } from "@shared/schema";
import WheelCanvas from "@/components/wheel-canvas";
import FileUpload from "@/components/file-upload";
import ManualDataInput from "@/components/manual-data-input";
import SelectedWinners from "@/components/selected-winners";

const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", 
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#6366f1", "#f43f5e"
];

interface Winner {
  name: string;
  occurrence: number;
  selectedAt: string;
}

export default function Home() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [originalParticipants, setOriginalParticipants] = useState<Participant[]>([]);
  const [selectedWinners, setSelectedWinners] = useState<Winner[]>([]);
  const [inputMode, setInputMode] = useState<'upload' | 'manual'>('upload');
  const { toast } = useToast();

  const handleUploadSuccess = (uploadedParticipants: Participant[]) => {
    setParticipants(uploadedParticipants);
    setOriginalParticipants(uploadedParticipants);
    setSelectedWinners([]); // Reset winners when new data is uploaded
  };

  const handleManualDataSuccess = (manualParticipants: Participant[]) => {
    setParticipants(manualParticipants);
    setOriginalParticipants(manualParticipants);
    setSelectedWinners([]); // Reset winners when new data is applied
  };

  const handleSpinComplete = (result: SpinResult) => {
    const winner = participants.find(p => p.name === result.winner);
    if (winner) {
      // Add to winners list
      const newWinner: Winner = {
        name: winner.name,
        occurrence: winner.occurrence,
        selectedAt: new Date().toISOString()
      };
      setSelectedWinners(prev => [...prev, newWinner]);
      
      // Remove winner from remaining participants
      setParticipants(prev => prev.filter(p => p.name !== result.winner));
    }
    
    setIsSpinning(false);
    toast({
      title: "Winner Selected!",
      description: `🎉 ${result.winner} has been selected!`,
    });
  };

  const handleReset = () => {
    setParticipants(originalParticipants);
    setSelectedWinners([]);
    toast({
      title: "Wheel reset",
      description: "All participants have been restored",
    });
  };

  const handleExport = () => {
    if (selectedWinners.length === 0) return;

    const csvContent = "data:text/csv;charset=utf-8," +
      "Name,Original Occurrence,Selected At\n" +
      selectedWinners.map((winner: Winner) => 
        `${winner.name},${winner.occurrence},${winner.selectedAt}`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_winners.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Prepare wheel participants with colors
  const wheelParticipants: WheelParticipant[] = participants.map((participant: Participant, index: number) => ({
    ...participant,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <i className="fas fa-dice text-primary-foreground text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Lucky Spinner</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Interactive Wheel of Fortune
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[calc(100vh-160px)]">
          
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Input Mode Toggle */}
            <div className="bg-card rounded-lg p-4 shadow-lg border border-border">
              <div className="flex items-center space-x-1 bg-muted p-1 rounded-md">
                <button
                  onClick={() => setInputMode('upload')}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center ${
                    inputMode === 'upload'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="toggle-upload-mode"
                >
                  <i className="fas fa-upload mr-2" />
                  Upload File
                </button>
                <button
                  onClick={() => setInputMode('manual')}
                  className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center ${
                    inputMode === 'manual'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid="toggle-manual-mode"
                >
                  <i className="fas fa-keyboard mr-2" />
                  Manual Entry
                </button>
              </div>
            </div>

            {/* Input Component */}
            {inputMode === 'upload' ? (
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            ) : (
              <ManualDataInput 
                onDataSuccess={handleManualDataSuccess} 
                existingParticipants={participants}
              />
            )}

            {/* Loaded Data Preview */}
            <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <i className="fas fa-list text-accent mr-2" />
                Loaded Data
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto" data-testid="participants-list">
                {wheelParticipants.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No data loaded yet
                  </div>
                ) : (
                  wheelParticipants.map((participant, index) => (
                    <div
                      key={`${participant.name}-${index}`}
                      className="flex justify-between items-center p-2 bg-secondary rounded text-sm"
                      data-testid={`participant-item-${index}`}
                    >
                      <span>{participant.name}</span>
                      <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs">
                        {participant.occurrence}x
                      </span>
                    </div>
                  ))
                )}
              </div>

              {wheelParticipants.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border text-sm text-muted-foreground">
                  Total participants: <span className="text-foreground font-medium" data-testid="text-total-participants">
                    {wheelParticipants.length}
                  </span>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            {participants.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={handleReset}
                  className="w-full bg-destructive text-destructive-foreground py-3 px-4 rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center"
                  data-testid="button-reset"
                >
                  <i className="fas fa-redo mr-2" />
                  Reset Wheel
                </button>
              </div>
            )}
          </div>

          {/* Wheel Section */}
          <div className="lg:col-span-2 flex flex-col items-center justify-start space-y-6 pt-4">
            <WheelCanvas
              participants={wheelParticipants}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              onSpinStart={() => setIsSpinning(true)}
            />

            {isSpinning && (
              <div className="text-center flex items-center justify-center text-accent">
                <i className="fas fa-spinner animate-spin mr-2" />
                Spinning...
              </div>
            )}
          </div>

          {/* Selected Winners */}
          <div className="lg:col-span-1">
            <SelectedWinners
              winners={selectedWinners}
              remainingCount={wheelParticipants.length}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Upload an Excel file or manually enter participant data to get started</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
