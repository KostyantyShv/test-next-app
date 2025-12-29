import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip } from './Tooltip';
import { Toggle } from './Toggle';
import { THEMES, LAYOUTS } from '../constants';
import { Preferences, Theme, Layout, Language, ComparisonLayout } from '../types';

interface GeneralPreferencesProps {
  preferences: Preferences;
  onUpdatePreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  onSave: () => void;
  isSaving: boolean;
}

export const GeneralPreferences: FC<GeneralPreferencesProps> = ({
  preferences,
  onUpdatePreference,
  onSave,
  isSaving,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-6 mb-[30px] md:mb-12 items-start">
      <div className="flex-[0_0_100%] md:flex-[0_0_30%] md:pt-16">
        <h2 className="text-[18px] md:text-xl font-semibold text-[#464646] mb-2 md:mb-3">General Preferences</h2>
        <p className="text-[14px] text-[#5F5F5F] leading-[1.5] mb-5 md:mb-0">
          Configure your basic platform preferences, including language settings, display theme, and layout options for the best user experience.
        </p>
      </div>

      <div className="flex-[0_0_100%] md:flex-[0_0_70%]">
        {/* Save button - only desktop at top */}
        <div className="hidden md:block text-right mb-5">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="bg-[#0B6333] text-white border-none px-6 py-3 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-[#089E68] disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>

        <div className="bg-white rounded-xl md:rounded-lg p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0_1px_3px_rgba(0,0,0,0.1)] mb-[15px] md:mb-0">
          {/* Language */}
          <div className="py-4 border-b border-[#DFDDDB] last:border-b-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[15px] md:text-sm font-medium text-[#464646]">Language</span>
              <Tooltip text="Sets the display language for menus, buttons, and other interface elements. Your saved content and user reviews will not be translated." />
            </div>
            <div className="relative mt-2">
              <select
                value={preferences.language}
                onChange={(e) => onUpdatePreference('language', e.target.value as Language)}
                className="w-full px-4 py-[14px] md:py-3 border border-[#DFDDDB] rounded-lg md:rounded-md bg-white text-[16px] md:text-sm text-[#464646] cursor-pointer transition-colors focus:outline-none focus:border-[#0B6333] appearance-none"
                style={{maxWidth: '100%'}}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-3 h-3 text-[#5F5F5F]" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M6 8L2 4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Display Theme */}
          <div className="py-4 border-b border-[#DFDDDB]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm md:text-sm font-medium text-[#464646]">Display Theme</span>
              <Tooltip text="Choose how the site looks to you. 'System' will match your current device's theme setting." />
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-5 mt-3 border border-[#DFDDDB]">
              {/* Quick theme selector */}
              <div className="flex gap-2.5 md:gap-3 mb-5 flex-wrap justify-center md:justify-start">
                {THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => onUpdatePreference('theme', theme.id)}
                    className={cn(
                      "w-11 h-11 md:w-10 md:h-10 rounded-lg md:rounded-md cursor-pointer border-2 md:border-2 transition-all active:scale-95 md:hover:scale-105",
                      preferences.theme === theme.id ? "border-[#0B6333] shadow-[0_0_0_2px_rgba(11,99,51,0.2)] md:shadow-[0_0_0_2px_rgba(11,99,51,0.15)]" : "border-transparent",
                      theme.id === 'midnight' && "bg-gradient-to-br from-[#0E1525] to-[#2B3245]",
                      theme.id === 'light' && "bg-gradient-to-br from-white to-[#F8F9FA] border-[#EBEDEF]",
                      theme.id === 'mint' && "bg-gradient-to-br from-[#F1F6F4] to-[#E9F1EE]",
                      theme.id === 'teal' && "bg-gradient-to-br from-[#F0F7F9] to-[#E6F3F7]",
                      theme.id === 'oceanic' && "bg-gradient-to-br from-[#F4F9FC] to-[#E1E7EE]"
                    )}
                    title={theme.name}
                  />
                ))}
              </div>

              {/* Theme grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
                {THEMES.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => onUpdatePreference('theme', theme.id)}
                    className={cn(
                      "bg-[#F8F9FA] border-2 rounded-lg p-3 md:p-4 cursor-pointer transition-all relative overflow-hidden active:scale-95 md:active:scale-100",
                      preferences.theme === theme.id ? "border-[#0B6333] shadow-[0_0_0_2px_rgba(11,99,51,0.15)]" : "border-[#DFDDDB] md:hover:-translate-y-0.5 md:hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                    )}
                  >
                    {preferences.theme === theme.id && (
                      <>
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-[18px] md:h-[18px] bg-[#0B6333] rounded-full z-20" />
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-[18px] md:h-[18px] text-white text-[10px] md:text-[11px] font-bold flex items-center justify-center z-30">✓</div>
                      </>
                    )}
                    <div className={cn(
                      "w-full h-[60px] md:h-20 rounded mb-2 md:mb-3 relative overflow-hidden border border-black/5",
                      theme.id === 'midnight' && "bg-[#0E1525]",
                      theme.id === 'light' && "bg-white",
                      theme.id === 'mint' && "bg-[#F1F6F4]",
                      theme.id === 'teal' && "bg-[#F0F7F9]",
                      theme.id === 'oceanic' && "bg-[#F4F9FC]"
                    )}>
                      <div 
                        className="h-full p-1.5 md:p-2 flex flex-col gap-0.5 md:gap-1"
                        style={{ 
                          backgroundColor: 'transparent !important',
                          color: 'inherit !important',
                          transition: 'none'
                        }}
                      >
                        <div className={cn("h-3 md:h-4 rounded flex items-center gap-0.5 md:gap-1 px-1 md:px-1.5", theme.id === 'midnight' ? "bg-[#1C2333]" : "bg-[#F8F9FA]")}>
                          <div className="w-1 h-1 rounded-full bg-[#ff5f57]" />
                          <div className="w-1 h-1 rounded-full bg-[#ffbd2e]" />
                          <div className="w-1 h-1 rounded-full bg-[#28ca42]" />
                        </div>
                        <div className={cn("flex-1 rounded ml-2 md:ml-4", 
                          theme.id === 'midnight' ? "bg-[#1D77BD]" : 
                          theme.id === 'mint' ? "bg-[#089E68]" :
                          theme.id === 'teal' ? "bg-[#13C4CC]" :
                          theme.id === 'oceanic' ? "bg-[#458BC1]" :
                          "bg-[#1D77BD]"
                        )} />
                        <div className={cn("h-2 md:h-2.5 rounded mr-2 md:mr-4", 
                          theme.id === 'midnight' ? "bg-[#2B3245]" : 
                          theme.id === 'mint' ? "bg-[#E9F1EE]" :
                          theme.id === 'teal' ? "bg-[#E6F3F7]" :
                          theme.id === 'oceanic' ? "bg-[#E1E7EE]" :
                          "bg-[#EBEDEF]"
                        )} />
                        <div className={cn("flex-1 rounded ml-2 md:ml-4", 
                          theme.id === 'midnight' ? "bg-[#1D77BD]" : 
                          theme.id === 'mint' ? "bg-[#089E68]" :
                          theme.id === 'teal' ? "bg-[#13C4CC]" :
                          theme.id === 'oceanic' ? "bg-[#458BC1]" :
                          "bg-[#1D77BD]"
                        )} />
                        <div className={cn("h-2 md:h-3 rounded border", 
                          theme.id === 'midnight' ? "bg-[#1C2333] border-[#4E5569]" : 
                          theme.id === 'mint' ? "bg-[#FFFFFF] border-[#BFDBD0]" :
                          theme.id === 'teal' ? "bg-[#FFFFFF] border-[#C0DCE6]" :
                          theme.id === 'oceanic' ? "bg-[#FFFFFF] border-[#E0E9F1]" :
                          "bg-[#F8F9FA] border-[#CCCCCC]"
                        )} />
                      </div>
                    </div>
                    <div className="text-xs md:text-[13px] font-medium md:font-semibold mb-0.5 md:mb-1 text-[#464646]">{theme.name}</div>
                    <div className="text-[10px] md:text-[12px] text-[#5F5F5F] leading-tight md:leading-snug">{theme.description}</div>
                  </div>
                ))}
              </div>

              {/* Auto theme toggle */}
              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-[#DFDDDB] rounded-lg md:rounded-md gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-[#464646] text-sm">Auto dark theme</h4>
                  <p className="text-xs md:text-[13px] text-[#5F5F5F]">Automatically switch to dark theme based on your system preferences</p>
                </div>
                <Toggle
                  checked={preferences.autoTheme}
                  onChange={() => onUpdatePreference('autoTheme', !preferences.autoTheme)}
                />
              </div>
            </div>
          </div>

          {/* Search Results Layout */}
          <div className="py-4 border-b border-[#DFDDDB]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm md:text-sm font-medium text-[#464646]">Search Results Layout</span>
              <Tooltip text="Select your preferred default layout for viewing lists of schools on the Explore and Search pages." />
            </div>

            <div className="bg-white rounded-lg p-3 md:p-5 mt-3 md:mt-4 border border-[#DFDDDB]">
              {/* Current selection */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-5 p-3 bg-[#EBFCF4] border border-[#D7F7E9] rounded-lg md:rounded-md transition-all md:hover:border-[#0B6333] md:hover:bg-[#D7F7E9] gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div className="text-xs md:text-[13px] font-medium text-[#5F5F5F]">Current Layout:</div>
                  <div className="text-sm font-semibold text-[#0B6333]">
                    {LAYOUTS.find(l => l.id === preferences.searchLayout)?.name}
                  </div>
                </div>
                
                {/* Quick toggle */}
                <div className="inline-flex items-center bg-[#F8F9FA] rounded-lg md:rounded-md p-0.5 border border-[#DFDDDB] transition-shadow md:hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                  {['grid', 'list', 'hybrid', 'classic'].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => onUpdatePreference('searchLayout', layout as Layout)}
                      className={cn(
                        "flex items-center justify-center w-8 h-7 bg-transparent border-none rounded cursor-pointer transition-all flex-shrink-0 relative",
                        preferences.searchLayout === layout && "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                      )}
                    >
                      {layout === 'grid' && (
                        <svg className={cn("w-4 h-4 transition-colors", preferences.searchLayout === layout ? "text-[#0B6333]" : "text-[#5F5F5F] hover:text-[#464646]")} viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"/>
                        </svg>
                      )}
                      {layout === 'list' && (
                        <svg className={cn("w-4 h-4 transition-colors", preferences.searchLayout === layout ? "text-[#0B6333]" : "text-[#5F5F5F] hover:text-[#464646]")} viewBox="0 0 16 16" fill="currentColor">
                          <path d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"/>
                        </svg>
                      )}
                      {layout === 'hybrid' && (
                        <svg className={cn("w-4 h-4 transition-colors", preferences.searchLayout === layout ? "text-[#0B6333]" : "text-[#5F5F5F] hover:text-[#464646]")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M10 5h11m-11 7h11m-11 7h11M6 3.5H3v3h3v-3zm0 7H3v3h3v-3zm0 7H3v3h3v-3z"/>
                        </svg>
                      )}
                      {layout === 'classic' && (
                        <svg className={cn("w-4 h-4 transition-colors", preferences.searchLayout === layout ? "text-[#0B6333]" : "text-[#5F5F5F] hover:text-[#464646]")} viewBox="0 0 16 16" fill="currentColor">
                          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {LAYOUTS.map((layout) => (
                  <div
                    key={layout.id}
                    onClick={() => onUpdatePreference('searchLayout', layout.id)}
                    className={cn(
                      "bg-[#F8F9FA] border-2 rounded-lg p-3 md:p-4 cursor-pointer transition-all relative overflow-hidden text-center active:scale-95 md:active:scale-100",
                      preferences.searchLayout === layout.id ? "border-[#0B6333] shadow-[0_0_0_2px_rgba(11,99,51,0.15)] bg-white" : "border-[#DFDDDB] md:hover:-translate-y-0.5 md:hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)] md:hover:border-[#0B6333]"
                    )}
                  >
                    {preferences.searchLayout === layout.id && (
                      <>
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-[18px] md:h-[18px] bg-[#0B6333] rounded-full z-20" />
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 w-4 h-4 md:w-[18px] md:h-[18px] text-white text-[10px] md:text-[11px] font-bold flex items-center justify-center z-30">✓</div>
                      </>
                    )}
                    <div className="w-full h-[50px] md:h-[70px] mb-2 md:mb-3 rounded bg-white border border-[#DFDDDB] flex items-center justify-center relative overflow-hidden">
                      <div className="w-4/5 h-4/5 relative">
                        {/* Layout preview components */}
                        {layout.id === 'grid' && (
                          <div className="w-full h-full grid grid-cols-3 gap-[2px]">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="bg-[#0B6333] opacity-80 rounded-[1px]" />
                            ))}
                          </div>
                        )}
                        {layout.id === 'list' && (
                          <div className="w-full h-full flex flex-col gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`bg-[#0B6333] opacity-80 rounded-[1px] ${i === 1 ? 'w-[85%]' : i === 2 ? 'w-[90%]' : 'w-full'}`}
                                style={{ height: '8px' }}
                              />
                            ))}
                          </div>
                        )}
                        {layout.id === 'hybrid' && (
                          <div className="w-full h-full grid grid-cols-[1fr_2fr] gap-1">
                            <div className="flex flex-col gap-[2px]">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-[#0B6333] opacity-80 rounded-[1px] flex-1" />
                              ))}
                            </div>
                            <div className="bg-[#0B6333] opacity-80 rounded-[1px]" />
                          </div>
                        )}
                        {layout.id === 'classic' && (
                          <div className="w-full h-full grid grid-cols-2 gap-1">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <div key={i} className="bg-[#0B6333] opacity-80 rounded-[1px] grid grid-rows-[1fr_3fr] gap-[1px] p-[1px]">
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                              </div>
                            ))}
                          </div>
                        )}
                        {layout.id === 'table' && (
                          <div className="w-full h-full flex flex-col gap-[1px]">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="bg-[#0B6333] opacity-80 rounded-[1px] grid grid-cols-3 gap-[1px] p-[1px]" style={{ height: '8px' }}>
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                              </div>
                            ))}
                          </div>
                        )}
                        {layout.id === 'card' && (
                          <div className="w-full h-full grid grid-cols-2 gap-1">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <div key={i} className="bg-[#0B6333] opacity-80 rounded-[2px] relative p-[2px]">
                                <div className="h-[25%] bg-[#F8F9FA] rounded-[1px] mb-[1px]" />
                                <div className="h-[70%] bg-[#F8F9FA] rounded-[1px]" />
                              </div>
                            ))}
                          </div>
                        )}
                        {layout.id === 'magazine' && (
                          <div className="w-full h-full grid grid-cols-[2fr_1fr] grid-rows-2 gap-1">
                            <div className="bg-[#0B6333] opacity-80 rounded-[1px] row-span-2" />
                            <div className="bg-[#0B6333] opacity-80 rounded-[1px]" />
                            <div className="bg-[#0B6333] opacity-80 rounded-[1px]" />
                          </div>
                        )}
                        {layout.id === 'compact' && (
                          <div className="w-full h-full flex flex-col gap-[1px]">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div key={i} className="bg-[#0B6333] opacity-80 rounded-[1px] grid grid-cols-[15px_1fr] gap-[1px] p-[1px]" style={{ height: '6px' }}>
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                                <div className="bg-[#F8F9FA] rounded-[1px]" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-[11px] md:text-[13px] font-medium md:font-semibold mb-0.5 md:mb-1 text-[#464646]">{layout.name}</div>
                    <div className="text-[9px] md:text-[11px] text-[#5F5F5F] leading-tight">{layout.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Layout */}
          <div className="py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm md:text-sm font-medium text-[#464646]">Comparison Layout</span>
              <Tooltip text="Choose layout of the school comparison page." />
            </div>
            <div className="mt-2 space-y-2">
              {[
                { value: 'side-by-side', label: 'Grid' },
                { value: 'vertical', label: 'List' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 text-sm md:text-sm text-[#464646] cursor-pointer py-3 md:py-2 rounded-lg md:rounded-none transition-colors md:hover:bg-[#F8F9FA]">
                  <input
                    type="radio"
                    name="comparison-layout"
                    value={option.value}
                    checked={preferences.comparisonLayout === option.value}
                    onChange={(e) => onUpdatePreference('comparisonLayout', e.target.value as ComparisonLayout)}
                    className="w-5 h-5 md:w-[18px] md:h-[18px] border-2 border-[#DFDDDB] rounded-full cursor-pointer appearance-none relative transition-colors checked:border-[#0B6333] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-[#0B6333] before:opacity-0 checked:before:opacity-100 flex-shrink-0"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
