import { useState } from "react";

interface Winner {
  name: string;
  occurrence: number;
  selectedAt: string;
}

interface SelectedWinnersProps {
  winners: Winner[];
  remainingCount: number;
  onExport: () => void;
}

export default function SelectedWinners({ winners, remainingCount, onExport }: SelectedWinnersProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-border h-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-trophy text-yellow-500 mr-2" />
        Selected Winners
      </h2>

      <div className="space-y-3" data-testid="winners-list">
        {winners.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <i className="fas fa-users text-4xl mb-3 opacity-50" />
            <p>No winners selected yet</p>
            <p className="text-sm">Spin the wheel to get started!</p>
          </div>
        ) : (
          winners.map((winner, index) => (
            <div
              key={`${winner.name}-${winner.selectedAt}`}
              className="bg-accent/10 border border-accent/20 rounded-lg p-3 animate-in slide-in-from-right duration-300"
              data-testid={`winner-item-${index}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-accent">{winner.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Selected #{index + 1}
                    {winner.occurrence > 1 && (
                      <span className="ml-2 text-primary">({winner.occurrence}x weight)</span>
                    )}
                  </div>
                </div>
                <i className="fas fa-check-circle text-accent" />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Total Selected:</span>
          <span className="font-medium text-accent" data-testid="text-selected-count">
            {winners.length}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-muted-foreground">Remaining:</span>
          <span className="font-medium" data-testid="text-remaining-count">
            {remainingCount}
          </span>
        </div>
      </div>

      <button
        onClick={onExport}
        disabled={winners.length === 0}
        className="w-full mt-4 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-export"
      >
        <i className="fas fa-download mr-2" />
        Export Selected
      </button>
    </div>
  );
}
