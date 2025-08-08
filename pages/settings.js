import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  Check,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../components/ui/alert-dialog';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    soundEnabled: true,
    autoSave: true,
    showCompleted: true,
    compactView: false,
    notifications: true,
    backgroundBlur: 20,
    glassOpacity: 0.1
  });

  const [exportData, setExportData] = useState(null);
  const [importStatus, setImportStatus] = useState(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('todoAppSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);

      // Apply theme immediately
      document.documentElement.classList.toggle('dark', parsed.theme === 'dark');
    }
  }, []);

  const updateSetting = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('todoAppSettings', JSON.stringify(newSettings));

    // Apply theme changes immediately
    if (key === 'theme') {
      document.documentElement.classList.toggle('dark', value === 'dark');
    }
  };

  const handleExportData = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const exportObj = {
      todos,
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportData('success');
    setTimeout(() => setExportData(null), 3000);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);

        if (importData.todos) {
          localStorage.setItem('todos', JSON.stringify(importData.todos));
        }

        if (importData.settings) {
          setSettings(importData.settings);
          localStorage.setItem('todoAppSettings', JSON.stringify(importData.settings));

          // Apply theme immediately
          document.documentElement.classList.toggle('dark', importData.settings.theme === 'dark');
        }

        setImportStatus('success');
        setTimeout(() => {
          setImportStatus(null);
          window.location.reload();
        }, 2000);

      } catch (error) {
        setImportStatus('error');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  const handleClearAllData = () => {
    localStorage.removeItem('todos');
    localStorage.removeItem('todoAppSettings');
    window.location.reload();
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      soundEnabled: true,
      autoSave: true,
      showCompleted: true,
      compactView: false,
      notifications: true,
      backgroundBlur: 20,
      glassOpacity: 0.1
    };
    setSettings(defaultSettings);
    localStorage.setItem('todoAppSettings', JSON.stringify(defaultSettings));
    document.documentElement.classList.remove('dark');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
            <SettingsIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your todo app experience
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Appearance Settings */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Theme</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <Switch
                      checked={settings.theme === 'dark'}
                      onCheckedChange={(checked) => updateSetting('theme', checked ? 'dark' : 'light')}
                    />
                    <Moon className="w-4 h-4" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Compact View</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Reduce spacing between items
                    </p>
                  </div>
                  <Switch
                    checked={settings.compactView}
                    onCheckedChange={(checked) => updateSetting('compactView', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Show Completed</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Display completed todos
                    </p>
                  </div>
                  <Switch
                    checked={settings.showCompleted}
                    onCheckedChange={(checked) => updateSetting('showCompleted', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Behavior Settings */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5" />
                  Behavior
                </CardTitle>
                <CardDescription>
                  Configure app functionality and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Sound Effects</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Play sounds for interactions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <VolumeX className="w-4 h-4" />
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                    />
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Auto Save</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Automatically save changes
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Notifications</label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Show system notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white/20 backdrop-blur-sm border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Export, import, or clear your todo data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    onClick={handleExportData}
                    variant="outline"
                    className="w-full justify-start bg-white/10 hover:bg-white/20 border-white/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                    {exportData === 'success' && (
                      <Badge variant="secondary" className="ml-auto">
                        <Check className="w-3 h-3 mr-1" />
                        Exported
                      </Badge>
                    )}
                  </Button>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="import-file"
                    />
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white/10 hover:bg-white/20 border-white/30"
                      asChild
                    >
                      <label htmlFor="import-file" className="cursor-pointer flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Data
                        {importStatus === 'success' && (
                          <Badge variant="secondary" className="ml-auto flex items-center">
                            <Check className="w-3 h-3 mr-1" />
                            Success
                          </Badge>
                        )}
                        {importStatus === 'error' && (
                          <Badge variant="destructive" className="ml-auto flex items-center">
                            <X className="w-3 h-3 mr-1" />
                            Error
                          </Badge>
                        )}
                      </label>
                    </Button>
                  </div>

                  <Button
                    onClick={handleResetSettings}
                    variant="outline"
                    className="w-full justify-start bg-white/10 hover:bg-white/20 border-white/30"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <Card className="bg-red-50/20 backdrop-blur-sm border-red-200/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions that will delete your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Data
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white/90 backdrop-blur-sm border-white/30">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your todos and settings.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleClearAllData} className="bg-red-600 hover:bg-red-700">
                        Clear All Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
