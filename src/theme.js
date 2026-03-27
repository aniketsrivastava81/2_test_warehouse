import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: { main: '#b01f24' },
    secondary: { main: '#151515' },
    background: { default: '#f4f0eb', paper: '#ffffff' },
    text: { primary: '#151515', secondary: 'rgba(21,21,21,0.68)' }
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.06em' },
    h2: { fontWeight: 800, letterSpacing: '-0.05em' },
    button: { textTransform: 'none', fontWeight: 700 }
  },
  components: {
    MuiChip: { styleOverrides: { root: { borderRadius: 999, fontWeight: 700 } } },
    MuiAccordion: { styleOverrides: { root: { borderRadius: 24, boxShadow: 'none', border: '1px solid rgba(21,21,21,0.06)', overflow: 'hidden' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 999, paddingInline: 20, minHeight: 44, boxShadow: 'none' } } }
  }
});
