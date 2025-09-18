import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Participant } from "@shared/schema";

interface ManualDataInputProps {
  onDataSuccess: (participants: Participant[]) => void;
  existingParticipants: Participant[];
}

export default function ManualDataInput({ onDataSuccess, existingParticipants }: ManualDataInputProps) {
  const [participants, setParticipants] = useState<Participant[]>(existingParticipants);
  const [newParticipantName, setNewParticipantName] = useState("");
  const [newParticipantOccurrence, setNewParticipantOccurrence] = useState(1);
  const { toast } = useToast();

  const handleAddParticipant = () => {
    const trimmedName = newParticipantName.trim();
    
    if (!trimmedName) {
      toast({
        title: "Invalid name",
        description: "Please enter a participant name",
        variant: "destructive"
      });
      return;
    }

    if (newParticipantOccurrence < 1) {
      toast({
        title: "Invalid occurrence",
        description: "Occurrence must be at least 1",
        variant: "destructive"
      });
      return;
    }

    // Check if participant already exists
    const existingParticipant = participants.find(p => 
      p.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingParticipant) {
      toast({
        title: "Participant already exists",
        description: "This participant is already in the list",
        variant: "destructive"
      });
      return;
    }

    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name: trimmedName,
      occurrence: newParticipantOccurrence
    };

    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    setNewParticipantName("");
    setNewParticipantOccurrence(1);

    toast({
      title: "Participant added",
      description: `${trimmedName} added with ${newParticipantOccurrence} occurrence(s)`,
    });
  };

  const handleRemoveParticipant = (id: string) => {
    const updatedParticipants = participants.filter(p => p.id !== id);
    setParticipants(updatedParticipants);
    
    toast({
      title: "Participant removed",
      description: "Participant has been removed from the list",
    });
  };

  const handleUpdateOccurrence = (id: string, newOccurrence: number) => {
    if (newOccurrence < 1) return;
    
    const updatedParticipants = participants.map(p => 
      p.id === id ? { ...p, occurrence: newOccurrence } : p
    );
    setParticipants(updatedParticipants);
  };

  const handleApplyData = () => {
    if (participants.length === 0) {
      toast({
        title: "No participants",
        description: "Please add at least one participant",
        variant: "destructive"
      });
      return;
    }

    onDataSuccess(participants);
    toast({
      title: "Data applied",
      description: `Applied ${participants.length} participants to the wheel`,
    });
  };

  const handleClearAll = () => {
    setParticipants([]);
    toast({
      title: "List cleared",
      description: "All participants have been removed",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddParticipant();
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-keyboard text-accent mr-2" />
        Manual Data Entry
      </h2>

      {/* Add New Participant Form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Participant Name
          </label>
          <input
            type="text"
            value={newParticipantName}
            onChange={(e) => setNewParticipantName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter participant name"
            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-participant-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Occurrences (Weight)
          </label>
          <input
            type="number"
            value={newParticipantOccurrence}
            onChange={(e) => setNewParticipantOccurrence(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            placeholder="1"
            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-participant-occurrence"
          />
        </div>

        <button
          onClick={handleAddParticipant}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
          data-testid="button-add-participant"
        >
          <i className="fas fa-plus mr-2" />
          Add Participant
        </button>
      </div>

      {/* Participants List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium">
            Participants ({participants.length})
          </h3>
          {participants.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-destructive hover:text-destructive/80 transition-colors"
              data-testid="button-clear-all"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto" data-testid="manual-participants-list">
          {participants.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No participants added yet
            </div>
          ) : (
            participants.map((participant, index) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-3 bg-secondary rounded border"
                data-testid={`manual-participant-item-${index}`}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">{participant.name}</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={participant.occurrence}
                    onChange={(e) => handleUpdateOccurrence(participant.id, parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-16 px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    data-testid={`input-occurrence-${index}`}
                  />
                  <span className="text-xs text-muted-foreground">x</span>
                  <button
                    onClick={() => handleRemoveParticipant(participant.id)}
                    className="text-destructive hover:text-destructive/80 text-sm"
                    data-testid={`button-remove-${index}`}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {participants.length > 0 && (
          <button
            onClick={handleApplyData}
            className="w-full bg-accent text-accent-foreground py-2 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors flex items-center justify-center"
            data-testid="button-apply-data"
          >
            <i className="fas fa-check mr-2" />
            Apply to Wheel
          </button>
        )}
      </div>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <h4 className="text-sm font-medium mb-2">Tips:</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• Higher occurrence values = better odds</div>
          <div>• Press Enter to quickly add participants</div>
          <div>• Edit occurrences directly in the list</div>
        </div>
      </div>
    </div>
  );
}