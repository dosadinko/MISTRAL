import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MistralAppModule } from './app.module';

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(MistralAppModule)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
