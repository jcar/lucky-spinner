import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Participant, WheelParticipant, SpinResult, Session } from "@shared/schema";
import WheelCanvas from "@/components/wheel-canvas";
import FileUpload from "@/components/file-upload";
import SelectedWinners from "@/components/selected-winners";

const COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", 
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f59e0b", "#10b981", "#6366f1", "#f43f5e"
];

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get current session data
  const { data: session, refetch: refetchSession } = useQuery({
    queryKey: ["/api/sessions", sessionId],
    enabled: !!sessionId,
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/sessions"),
    onSuccess: async (response) => {
      const session: Session = await response.json();
      setSessionId(session.id);
      queryClient.invalidateQueries({ queryKey: ["/api/sessions"] });
    },
  });

  // Select winner mutation
  const selectWinnerMutation = useMutation({
    mutationFn: (winner: string) => 
      apiRequest("POST", `/api/sessions/${sessionId}/select-winner`, { winner }),
    onSuccess: () => {
      refetchSession();
      setIsSpinning(false);
    },
    onError: (error) => {
      setIsSpinning(false);
      toast({
        title: "Error selecting winner",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Reset session mutation
  const resetSessionMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/sessions/${sessionId}/reset`),
    onSuccess: () => {
      refetchSession();
      toast({
        title: "Wheel reset",
        description: "All participants have been restored",
      });
    },
  });

  const handleUploadSuccess = async (uploadedParticipants: Participant[]) => {
    setParticipants(uploadedParticipants);
    await createSessionMutation.mutateAsync();
  };

  const handleSpinComplete = (result: SpinResult) => {
    selectWinnerMutation.mutate(result.winner);
    toast({
      title: "Winner Selected!",
      description: `🎉 ${result.winner} has been selected!`,
    });
  };

  const handleReset = () => {
    resetSessionMutation.mutate();
  };

  const handleExport = () => {
    if (!session) return;

    const selectedWinners = JSON.parse(session.selectedWinners);
    const csvContent = "data:text/csv;charset=utf-8," +
      "Name,Original Occurrence,Selected At\n" +
      selectedWinners.map((winner: any) => 
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
  const wheelParticipants: WheelParticipant[] = session 
    ? JSON.parse(session.currentData).map((participant: Participant, index: number) => ({
        ...participant,
        color: COLORS[index % COLORS.length]
      }))
    : [];

  const selectedWinners = session ? JSON.parse(session.selectedWinners) : [];

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

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[calc(100vh-200px)]">
          
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload onUploadSuccess={handleUploadSuccess} />

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
            {sessionId && (
              <div className="space-y-3">
                <button
                  onClick={handleReset}
                  disabled={resetSessionMutation.isPending}
                  className="w-full bg-destructive text-destructive-foreground py-3 px-4 rounded-lg font-medium hover:bg-destructive/90 transition-colors flex items-center justify-center disabled:opacity-50"
                  data-testid="button-reset"
                >
                  <i className="fas fa-redo mr-2" />
                  {resetSessionMutation.isPending ? "Resetting..." : "Reset Wheel"}
                </button>
              </div>
            )}
          </div>

          {/* Wheel Section */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-8">
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
            <p>Upload your Excel file with names and occurrences to get started</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
