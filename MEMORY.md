Used a single combined `rm -f` command to remove all three placeholder files atomically. The previous attempt likely had an issue with the `&&` chain or exit handling. Test should now pass.
