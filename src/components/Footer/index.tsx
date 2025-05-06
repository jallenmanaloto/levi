import { useEffect, useState } from 'react';
import { getVersion } from '@tauri-apps/api/app';

export default function Footer() {
  const [version, setVersion] = useState<string>('');
  useEffect(() => {
    const getAppVersion = async () => {
      const appVersion = await getVersion();
      setVersion(appVersion);
    }

    getAppVersion();
  }, []);
  return (
    <div className="absolute right-5 left-5 bottom-2">
      <div className="flex w-full justify-end">
        <h3 className="text-xs text-gray-200/20">{version}</h3>
      </div>
    </div>
  )
}
