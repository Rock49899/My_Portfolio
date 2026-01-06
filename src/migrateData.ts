import { collection, addDoc, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  skillsData,
  servicesData,
  aboutData,
  projectsData,
  heroData,
  contactData,
} from './data/portfolio-data';

// Fonction pour nettoyer une collection
const clearCollection = async (collectionName: string) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
    console.log(`🧹 ${collectionName}: ${snapshot.size} documents supprimés`);
  } catch (error) {
    console.log(`ℹ️  ${collectionName}: Rien à nettoyer`);
  }
};

const migrateData = async () => {
  try {
    console.log('🚀 Début de la migration des données vers Firestore...\n');

    // Nettoyer toutes les collections avant migration
    console.log('🧹 Nettoyage des collections existantes...');
    await clearCollection('skills');
    await clearCollection('services');
    await clearCollection('projects');
    console.log('✅ Nettoyage terminé\n');

    // Migrer les compétences (skills)
    console.log('📊 Migration des compétences...');
    for (let i = 0; i < skillsData.length; i++) {
      const skill = skillsData[i];
      try {
        await addDoc(collection(db, 'skills'), skill);
        console.log(`  ✓ ${skill.name}`);
      } catch (error) {
        console.error(`  ✗ Erreur pour ${skill.name}:`, error.message);
      }
    }
    console.log(`✅ ${skillsData.length} compétences migrées\n`);

    // Migrer les services
    console.log('🛠️  Migration des services...');
    for (let i = 0; i < servicesData.length; i++) {
      const service = servicesData[i];
      try {
        await addDoc(collection(db, 'services'), service);
        console.log(`  ✓ ${service.title}`);
      } catch (error) {
        console.error(`  ✗ Erreur pour ${service.title}:`, error.message);
      }
    }
    console.log(`✅ ${servicesData.length} services migrés\n`);

    // Migrer les projets
    console.log('💼 Migration des projets...');
    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      try {
        await addDoc(collection(db, 'projects'), project);
        console.log(`  ✓ ${project.title}`);
      } catch (error) {
        console.error(`  ✗ Erreur pour ${project.title}:`, error.message);
      }
    }
    console.log(`✅ ${projectsData.length} projets migrés\n`);

    // Migrer les données About (document unique)
    console.log('👤 Migration des données About...');
    try {
      await setDoc(doc(db, 'about', 'main'), aboutData);
      console.log('✅ Données About migrées\n');
    } catch (error) {
      console.error('❌ Erreur About:', error.message, '\n');
    }

    // Migrer les données Hero (document unique)
    console.log('🎯 Migration des données Hero...');
    try {
      await setDoc(doc(db, 'hero', 'main'), heroData);
      console.log('✅ Données Hero migrées\n');
    } catch (error) {
      console.error('❌ Erreur Hero:', error.message, '\n');
    }

    // Migrer les données de contact (document unique)
    console.log('📧 Migration des données de contact...');
    try {
      await setDoc(doc(db, 'contact', 'main'), contactData);
      console.log('✅ Données de contact migrées\n');
    } catch (error) {
      console.error('❌ Erreur Contact:', error.message, '\n');
    }

    // Créer le mot de passe admin par défaut
    console.log('Configuration du mot de passe admin...');
    try {
      await setDoc(doc(db, 'admin', 'credentials'), {
        password: 'admin123',
        createdAt: new Date().toISOString(),
        note: 'Changez ce mot de passe immédiatement après la première connexion!'
      });
      console.log('Mot de passe admin créé: admin123 (à changer!)\n');
    } catch (error) {
      console.error('Erreur création mot de passe admin:', error.message, '\n');
    }

    console.log('Migration terminée avec succès !');
    console.log('\nCollections créées dans Firestore :');
    console.log('  - skills (compétences)');
    console.log('  - services');
    console.log('  - projects (projets)');
    console.log('  - about (à propos)');
    console.log('  - hero (page d\'accueil)');
    console.log('  - contact');
    console.log('  - admin (mot de passe)');
    console.log('\n✏️  Toutes les données sont maintenant éditables depuis Firebase Console !');
    console.log('\n🔑 Mot de passe admin par défaut: admin123');
    console.log('⚠️  IMPORTANT: Changez-le immédiatement via le dashboard!');
  } catch (error) {
    console.error('❌ Erreur lors de la migration :', error);
    throw error;
  }
};

export default migrateData;