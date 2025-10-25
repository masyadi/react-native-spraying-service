# @pakjarot/spraying-services

Library for srpaying services

## Installation


```sh
npm install @pakjarot/spraying-services
```


## Usage

- Registrasikan didalam navigation

```js
import { registerSprayingServiceRoutes } from '@pakjarot/spraying-services';

// ...
<NavigationContainer>
  <Stack.Navigator>
    ...

    {registerSprayingServiceRoutes({Stack: Stack})}
  </Stack.Navigator>
</NavigationContainer>
```

- Gunakan navigation

```js
import { Routes } from '@pakjarot/spraying-services';

// ...
<Button
  title="Jasa Semprot"
  onPress={() => {
    navigation.navigate(Routes.ScreenHome);
  }}
/>
```

## License

MIT
