import { createTheme } from '@mui/material/styles';

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#3B82F6' },
      secondary: { main: '#EF4444' },
      background: {
        default: mode === 'dark' ? '#0A0E1A' : '#F9FAFB',
        paper: mode === 'dark' ? '#1C2526' : '#FFFFFF',
        secondary: mode === 'dark' ? '#2D3748' : '#E5E7EB',
      },
      text: {
        primary: mode === 'dark' ? '#E2E8F0' : '#1F2937',
        secondary: mode === 'dark' ? '#94A3B8' : '#6B7280',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
      h4: { fontFamily: '"Poppins", sans-serif', fontWeight: 600, fontSize: '1.75rem' },
      h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 500, fontSize: '1.25rem' },
      body1: { fontWeight: 400, fontSize: '1rem' },
      body2: { fontWeight: 400, fontSize: '0.875rem' },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(8px)',
            backgroundColor: mode === 'dark' ? 'rgba(10, 14, 26, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            borderBottom: `1px solid ${mode === 'dark' ? '#2D3748' : '#E5E7EB'}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            padding: '8px 16px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: `0 4px 8px ${mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
            },
          },
          containedPrimary: {
            boxShadow: `0 2px 4px ${mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              '&:hover fieldset': {
                borderColor: '#3B82F6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3B82F6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              },
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          },
        },
      },
    },
    transitions: {
      duration: {
        standard: 300,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });

export default theme;