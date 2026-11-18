import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook untuk mengecek apakah komponen telah selesai di-mount di sisi klien.
 * Menggunakan useSyncExternalStore agar tidak memicu re-render sinkron atau hydration warning.
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
