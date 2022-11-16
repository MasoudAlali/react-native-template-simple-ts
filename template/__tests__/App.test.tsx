/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

import {render, renderHook, waitFor} from '@/../jest/testUtils';
import {useNavigationTheme} from '@/hooks/navigation';

describe('App Pages should work', () => {
  test('renders correctly', async () => {
    const {findByText} = await waitFor(() => render(<App />));

    const simpleText = await findByText('Salam');

    expect(simpleText).toBeDefined();
  });

  test('navigation hook should return correctly', async () => {
    const {
      result: {current},
    } = await waitFor(() => renderHook(() => useNavigationTheme()));

    expect(current.isDarkMode).toBe(false);
    expect(current.statusBarColor).toBe('dark-content');
    expect(current.navigationTheme).toHaveProperty('dark');
  });
});
