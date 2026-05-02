"""
Daily biorhythm reading: seeded energy snapshot with physical, emotional, and intellectual cycle values.
Deterministic output for consistent per-user daily check-ins via the RoxyAPI biorhythm domain.
"""

import os
from roxy_sdk import create_roxy

roxy = create_roxy(os.environ["ROXY_API_KEY"])


def main():
    # Daily biorhythm: same seed + same date always returns the same reading
    bio = roxy.biorhythm.get_daily_biorhythm(seed="sample-user", date="2026-04-23")

    print("Date:", bio["date"])
    print("Energy rating:", bio["energyRating"], "/ 10")
    print("Overall phase:", bio["overallPhase"])
    print()
    print("Primary cycles:")
    print("  Physical:      ", bio["quickRead"]["physical"])
    print("  Emotional:     ", bio["quickRead"]["emotional"])
    print("  Intellectual:  ", bio["quickRead"]["intellectual"])
    print()
    print(
        "Spotlight cycle:",
        bio["spotlight"]["cycle"],
        "|",
        bio["spotlight"]["value"],
        "|",
        bio["spotlight"]["phase"],
    )
    print("Spotlight message:", bio["spotlight"]["message"])
    print()
    print("Daily message:", bio["dailyMessage"])
    print("Advice:", bio["advice"])


if __name__ == "__main__":
    main()
