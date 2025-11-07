#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script to translate common sections for fr, tr, pl, pt-BR locales
"""

import json
import os

# French translations
fr_translations = {
    'common': {
        'search': 'Rechercher',
        'searchPlaceholder': 'Commencez à taper le nom de la calculatrice...',
        'searchResults': 'Résultats de la recherche',
        'resultsFor': 'Résultats pour',
        'loading': 'Chargement...',
        'found': 'Trouvé',
        'results': 'résultats',
        'noResults': 'Aucun résultat',
        'tryAnotherQuery': 'Essayez une autre requête ou vérifiez l\'orthographe',
        'noQuery': 'Aucune requête de recherche',
        'enterSearchTerm': 'Entrez un terme de recherche pour trouver des calculatrices',
        'useCalculator': 'Utiliser la calculatrice',
        'language': 'Langue',
        'categories': 'Catégories',
        'calculators': 'Calculatrices',
        'calculate': 'Calculer',
        'result': 'Résultat',
        'clear': 'Effacer',
        'favorites': 'Favoris',
        'notFound': {
            'title': 'Page non trouvée',
            'description': 'Désolé, la page demandée n\'existe pas.',
            'goHome': 'Aller à l\'accueil',
            'suggestions': {
                'title': 'Vous recherchez peut-être :',
                'checkUrl': 'Vérifiez l\'exactitude de l\'adresse saisie',
                'useSearch': 'Utilisez la recherche de calculatrices',
                'goToHome': 'Retourner à la page d\'accueil'
            }
        },
        'pdf': {
            'header': 'calc1.ru calculatrice #1 au monde',
            'savePdf': 'Enregistrer en PDF',
            'generated': 'Généré',
            'page': 'Page',
            'of': 'de'
        }
    },
    'brand': {
        'name': 'Calculatrice #1',
        'slogan': 'Un site. Toutes les calculatrices.'
    },
    'breadcrumbs': {
        'home': 'Accueil',
        'categories': {
            'finance': 'Finance',
            'math': 'Mathématiques',
            'life': 'Vie',
            'auto': 'Auto',
            'construction': 'Construction',
            'time': 'Temps',
            'health': 'Santé',
            'science': 'Science',
            'converter': 'Convertisseurs',
            'fun': 'Divertissement',
            'it': 'IT',
            'calculators': 'Toutes les calculatrices'
        }
    },
    'navigation': {
        'home': 'Accueil',
        'finance': 'Finance',
        'math': 'Mathématiques',
        'life': 'Vie',
        'construction': 'Construction',
        'auto': 'Auto',
        'time': 'Temps',
        'health': 'Santé',
        'science': 'Science',
        'converter': 'Convertisseur',
        'fun': 'Divertissement',
        'it': 'IT'
    },
    'footer': {
        'description': 'Calculatrices en ligne gratuites pour tous les domaines de la vie. Finance, mathématiques, construction, santé et bien plus encore.',
        'categories': 'Catégories',
        'quickLinks': 'Liens rapides',
        'about': 'À propos',
        'contact': 'Contact',
        'share': 'Partager',
        'shareDescription': 'Partagez la calculatrice avec vos amis et collègues !',
        'shareFacebook': 'Partager sur Facebook',
        'shareTwitter': 'Partager sur Twitter',
        'shareVK': 'Partager sur VKontakte',
        'shareTelegram': 'Partager sur Telegram',
        'shareWhatsApp': 'Partager sur WhatsApp',
        'shareEmail': 'Partager par email',
        'copyLink': 'Copier le lien',
        'linkCopied': 'Lien copié !',
        'shareNative': 'Partager',
        'rights': 'Tous droits réservés.',
        'disclaimer': 'Les calculatrices sont à titre informatif uniquement. Les résultats peuvent différer des valeurs réelles.',
        'privacy': 'Politique de confidentialité',
        'terms': 'Conditions d\'utilisation',
        'cookies': 'Politique des cookies',
        'siteDescription': 'Calculatrices en ligne gratuites pour tous les domaines de la vie'
    }
}

# Turkish translations
tr_translations = {
    'common': {
        'search': 'Ara',
        'searchPlaceholder': 'Hesap makinesi adını yazmaya başlayın...',
        'searchResults': 'Arama Sonuçları',
        'resultsFor': 'Sonuçlar',
        'loading': 'Yükleniyor...',
        'found': 'Bulundu',
        'results': 'sonuç',
        'noResults': 'Sonuç bulunamadı',
        'tryAnotherQuery': 'Başka bir sorgu deneyin veya yazımı kontrol edin',
        'noQuery': 'Arama sorgusu yok',
        'enterSearchTerm': 'Hesap makinelerini bulmak için bir arama terimi girin',
        'useCalculator': 'Hesap makinesini kullan',
        'language': 'Dil',
        'categories': 'Kategoriler',
        'calculators': 'Hesap Makineleri',
        'calculate': 'Hesapla',
        'result': 'Sonuç',
        'clear': 'Temizle',
        'favorites': 'Favoriler',
        'notFound': {
            'title': 'Sayfa Bulunamadı',
            'description': 'Üzgünüz, istenen sayfa mevcut değil.',
            'goHome': 'Ana Sayfaya Git',
            'suggestions': {
                'title': 'Belki şunu arıyorsunuz:',
                'checkUrl': 'Girilen adresin doğruluğunu kontrol edin',
                'useSearch': 'Hesap makinesi aramasını kullanın',
                'goToHome': 'Ana sayfaya dön'
            }
        },
        'pdf': {
            'header': 'calc1.ru dünyanın #1 hesap makinesi',
            'savePdf': 'PDF olarak kaydet',
            'generated': 'Oluşturuldu',
            'page': 'Sayfa',
            'of': '/'
        }
    },
    'brand': {
        'name': 'Hesap Makinesi #1',
        'slogan': 'Bir site. Tüm hesap makineleri.'
    },
    'breadcrumbs': {
        'home': 'Ana Sayfa',
        'categories': {
            'finance': 'Finans',
            'math': 'Matematik',
            'life': 'Yaşam',
            'auto': 'Otomotiv',
            'construction': 'İnşaat',
            'time': 'Zaman',
            'health': 'Sağlık',
            'science': 'Bilim',
            'converter': 'Dönüştürücüler',
            'fun': 'Eğlence',
            'it': 'BT',
            'calculators': 'Tüm Hesap Makineleri'
        }
    },
    'navigation': {
        'home': 'Ana Sayfa',
        'finance': 'Finans',
        'math': 'Matematik',
        'life': 'Yaşam',
        'construction': 'İnşaat',
        'auto': 'Otomotiv',
        'time': 'Zaman',
        'health': 'Sağlık',
        'science': 'Bilim',
        'converter': 'Dönüştürücü',
        'fun': 'Eğlence',
        'it': 'BT'
    },
    'footer': {
        'description': 'Hayatın her alanı için ücretsiz online hesap makineleri. Finans, matematik, inşaat, sağlık ve çok daha fazlası.',
        'categories': 'Kategoriler',
        'quickLinks': 'Hızlı Bağlantılar',
        'about': 'Hakkında',
        'contact': 'İletişim',
        'share': 'Paylaş',
        'shareDescription': 'Hesap makinesini arkadaşlarınız ve meslektaşlarınızla paylaşın!',
        'shareFacebook': 'Facebook\'ta paylaş',
        'shareTwitter': 'Twitter\'da paylaş',
        'shareVK': 'VKontakte\'de paylaş',
        'shareTelegram': 'Telegram\'da paylaş',
        'shareWhatsApp': 'WhatsApp\'ta paylaş',
        'shareEmail': 'E-posta ile paylaş',
        'copyLink': 'Bağlantıyı kopyala',
        'linkCopied': 'Bağlantı kopyalandı!',
        'shareNative': 'Paylaş',
        'rights': 'Tüm hakları saklıdır.',
        'disclaimer': 'Hesap makineleri yalnızca bilgilendirme amaçlıdır. Sonuçlar gerçek değerlerden farklı olabilir.',
        'privacy': 'Gizlilik Politikası',
        'terms': 'Kullanım Şartları',
        'cookies': 'Çerez Politikası',
        'siteDescription': 'Hayatın her alanı için ücretsiz online hesap makineleri'
    }
}

# Polish translations
pl_translations = {
    'common': {
        'search': 'Szukaj',
        'searchPlaceholder': 'Zacznij wpisywać nazwę kalkulatora...',
        'searchResults': 'Wyniki wyszukiwania',
        'resultsFor': 'Wyniki dla',
        'loading': 'Ładowanie...',
        'found': 'Znaleziono',
        'results': 'wyników',
        'noResults': 'Nic nie znaleziono',
        'tryAnotherQuery': 'Spróbuj innego zapytania lub sprawdź pisownię',
        'noQuery': 'Brak zapytania wyszukiwania',
        'enterSearchTerm': 'Wprowadź termin wyszukiwania, aby znaleźć kalkulatory',
        'useCalculator': 'Użyj kalkulatora',
        'language': 'Język',
        'categories': 'Kategorie',
        'calculators': 'Kalkulatory',
        'calculate': 'Oblicz',
        'result': 'Wynik',
        'clear': 'Wyczyść',
        'favorites': 'Ulubione',
        'notFound': {
            'title': 'Strona nie znaleziona',
            'description': 'Przepraszamy, żądana strona nie istnieje.',
            'goHome': 'Przejdź do strony głównej',
            'suggestions': {
                'title': 'Możesz szukać:',
                'checkUrl': 'Sprawdź poprawność wprowadzonego adresu',
                'useSearch': 'Użyj wyszukiwarki kalkulatorów',
                'goToHome': 'Wróć do strony głównej'
            }
        },
        'pdf': {
            'header': 'calc1.ru kalkulator #1 na świecie',
            'savePdf': 'Zapisz jako PDF',
            'generated': 'Wygenerowano',
            'page': 'Strona',
            'of': 'z'
        }
    },
    'brand': {
        'name': 'Kalkulator #1',
        'slogan': 'Jeden serwis. Wszystkie kalkulatory.'
    },
    'breadcrumbs': {
        'home': 'Strona główna',
        'categories': {
            'finance': 'Finanse',
            'math': 'Matematyka',
            'life': 'Życie',
            'auto': 'Motoryzacja',
            'construction': 'Budownictwo',
            'time': 'Czas',
            'health': 'Zdrowie',
            'science': 'Nauka',
            'converter': 'Konwertery',
            'fun': 'Rozrywka',
            'it': 'IT',
            'calculators': 'Wszystkie kalkulatory'
        }
    },
    'navigation': {
        'home': 'Strona główna',
        'finance': 'Finanse',
        'math': 'Matematyka',
        'life': 'Życie',
        'construction': 'Budownictwo',
        'auto': 'Motoryzacja',
        'time': 'Czas',
        'health': 'Zdrowie',
        'science': 'Nauka',
        'converter': 'Konwerter',
        'fun': 'Rozrywka',
        'it': 'IT'
    },
    'footer': {
        'description': 'Darmowe kalkulatory online dla wszystkich obszarów życia. Finanse, matematyka, budownictwo, zdrowie i wiele więcej.',
        'categories': 'Kategorie',
        'quickLinks': 'Szybkie linki',
        'about': 'O nas',
        'contact': 'Kontakt',
        'share': 'Udostępnij',
        'shareDescription': 'Udostępnij kalkulator znajomym i kolegom!',
        'shareFacebook': 'Udostępnij na Facebook',
        'shareTwitter': 'Udostępnij na Twitter',
        'shareVK': 'Udostępnij na VKontakte',
        'shareTelegram': 'Udostępnij na Telegram',
        'shareWhatsApp': 'Udostępnij na WhatsApp',
        'shareEmail': 'Udostępnij przez e-mail',
        'copyLink': 'Kopiuj link',
        'linkCopied': 'Link skopiowany!',
        'shareNative': 'Udostępnij',
        'rights': 'Wszelkie prawa zastrzeżone.',
        'disclaimer': 'Kalkulatory służą wyłącznie celom informacyjnym. Wyniki mogą różnić się od rzeczywistych wartości.',
        'privacy': 'Polityka prywatności',
        'terms': 'Warunki korzystania',
        'cookies': 'Polityka plików cookie',
        'siteDescription': 'Darmowe kalkulatory online dla wszystkich obszarów życia'
    }
}

# Portuguese (Brazil) translations
pt_BR_translations = {
    'common': {
        'search': 'Pesquisar',
        'searchPlaceholder': 'Comece a digitar o nome da calculadora...',
        'searchResults': 'Resultados da pesquisa',
        'resultsFor': 'Resultados para',
        'loading': 'Carregando...',
        'found': 'Encontrado',
        'results': 'resultados',
        'noResults': 'Nada encontrado',
        'tryAnotherQuery': 'Tente outra consulta ou verifique a ortografia',
        'noQuery': 'Nenhuma consulta de pesquisa',
        'enterSearchTerm': 'Digite um termo de pesquisa para encontrar calculadoras',
        'useCalculator': 'Usar calculadora',
        'language': 'Idioma',
        'categories': 'Categorias',
        'calculators': 'Calculadoras',
        'calculate': 'Calcular',
        'result': 'Resultado',
        'clear': 'Limpar',
        'favorites': 'Favoritos',
        'notFound': {
            'title': 'Página não encontrada',
            'description': 'Desculpe, a página solicitada não existe.',
            'goHome': 'Ir para a página inicial',
            'suggestions': {
                'title': 'Você pode estar procurando por:',
                'checkUrl': 'Verifique a correção do endereço inserido',
                'useSearch': 'Use a pesquisa de calculadoras',
                'goToHome': 'Voltar para a página inicial'
            }
        },
        'pdf': {
            'header': 'calc1.ru calculadora #1 do mundo',
            'savePdf': 'Salvar em PDF',
            'generated': 'Gerado',
            'page': 'Página',
            'of': 'de'
        }
    },
    'brand': {
        'name': 'Calculadora #1',
        'slogan': 'Um site. Todas as calculadoras.'
    },
    'breadcrumbs': {
        'home': 'Início',
        'categories': {
            'finance': 'Finanças',
            'math': 'Matemática',
            'life': 'Vida',
            'auto': 'Automotivo',
            'construction': 'Construção',
            'time': 'Tempo',
            'health': 'Saúde',
            'science': 'Ciência',
            'converter': 'Conversores',
            'fun': 'Entretenimento',
            'it': 'TI',
            'calculators': 'Todas as calculadoras'
        }
    },
    'navigation': {
        'home': 'Início',
        'finance': 'Finanças',
        'math': 'Matemática',
        'life': 'Vida',
        'construction': 'Construção',
        'auto': 'Automotivo',
        'time': 'Tempo',
        'health': 'Saúde',
        'science': 'Ciência',
        'converter': 'Conversor',
        'fun': 'Entretenimento',
        'it': 'TI'
    },
    'footer': {
        'description': 'Calculadoras online gratuitas para todas as áreas da vida. Finanças, matemática, construção, saúde e muito mais.',
        'categories': 'Categorias',
        'quickLinks': 'Links rápidos',
        'about': 'Sobre',
        'contact': 'Contato',
        'share': 'Compartilhar',
        'shareDescription': 'Compartilhe a calculadora com amigos e colegas!',
        'shareFacebook': 'Compartilhar no Facebook',
        'shareTwitter': 'Compartilhar no Twitter',
        'shareVK': 'Compartilhar no VKontakte',
        'shareTelegram': 'Compartilhar no Telegram',
        'shareWhatsApp': 'Compartilhar no WhatsApp',
        'shareEmail': 'Compartilhar por e-mail',
        'copyLink': 'Copiar link',
        'linkCopied': 'Link copiado!',
        'shareNative': 'Compartilhar',
        'rights': 'Todos os direitos reservados.',
        'disclaimer': 'As calculadoras são apenas para fins informativos. Os resultados podem diferir dos valores reais.',
        'privacy': 'Política de Privacidade',
        'terms': 'Termos de Uso',
        'cookies': 'Política de Cookies',
        'siteDescription': 'Calculadoras online gratuitas para todas as áreas da vida'
    }
}

# Mapping locales to translations
locales = {
    'fr': fr_translations,
    'tr': tr_translations,
    'pl': pl_translations,
    'pt-BR': pt_BR_translations
}

def update_locale(locale_code, translations):
    """Update common sections for a locale"""
    file_path = f'messages/{locale_code}.json'
    
    if not os.path.exists(file_path):
        print(f'⚠ Skipped {locale_code}.json (not found)')
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Update common sections
        for key in ['common', 'brand', 'breadcrumbs', 'navigation', 'footer']:
            if key in translations:
                data[key] = translations[key]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'✓ Updated {locale_code}.json')
        return True
    except Exception as e:
        print(f'✗ Error updating {locale_code}.json: {e}')
        return False

if __name__ == '__main__':
    print('Translating common sections for fr, tr, pl, pt-BR...\n')
    
    success_count = 0
    for locale_code, translations in locales.items():
        if update_locale(locale_code, translations):
            success_count += 1
    
    print(f'\n✓ Successfully updated {success_count}/{len(locales)} files')






