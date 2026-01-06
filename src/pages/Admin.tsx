import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Edit2, Trash2, Plus, Save, X, LogOut, Key } from 'lucide-react';

interface DataItem {
  id: string;
  [key: string]: any;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const collections = {
    skills: { name: 'Compétences', fields: ['name', 'level', 'category'] },
    services: { name: 'Services', fields: ['icon', 'title', 'description'] },
    projects: { name: 'Projets', fields: ['title', 'description', 'image', 'technologies', 'githubUrl', 'liveUrl', 'category', 'featured'] },
    about: { name: 'À propos', fields: ['title', 'description1', 'description2', 'image', 'stats'] },
    hero: { name: 'Hero', fields: ['name', 'title', 'description', 'image'] },
    contact: { name: 'Contact', fields: ['email', 'phone', 'location', 'socialLinks'] },
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  useEffect(() => {
    // Vérifier si déjà authentifié dans cette session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, activeTab));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    } catch (error) {
      console.error('Erreur chargement:', error);
    }
    setLoading(false);
  };

  const handleEdit = (item: DataItem) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSave = async () => {
    try {
      const { id, ...dataToUpdate } = editForm;
      await updateDoc(doc(db, activeTab, id), dataToUpdate);
      setEditingId(null);
      loadData();
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      try {
        await deleteDoc(doc(db, activeTab, id));
        loadData();
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, activeTab), editForm);
      setIsAdding(false);
      setEditForm({});
      loadData();
    } catch (error) {
      console.error('Erreur ajout:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Récupérer le mot de passe depuis Firestore
      const adminDoc = await getDoc(doc(db, 'admin', 'credentials'));
      
      if (!adminDoc.exists()) {
        // Première connexion: créer le mot de passe par défaut
        await setDoc(doc(db, 'admin', 'credentials'), {
          password: 'admin123', // Mot de passe par défaut
          createdAt: new Date().toISOString()
        });
        alert('Mot de passe par défaut créé: admin123. Changez-le immédiatement!');
        return;
      }

      const storedPassword = adminDoc.data().password;
      
      if (password === storedPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
      } else {
        alert('Mot de passe incorrect!');
      }
    } catch (error) {
      console.error('Erreur authentification:', error);
      alert('Erreur de connexion');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    if (newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères!');
      return;
    }

    try {
      await setDoc(doc(db, 'admin', 'credentials'), {
        password: newPassword,
        updatedAt: new Date().toISOString()
      });
      
      alert('Mot de passe changé avec succès!');
      setShowPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Erreur changement mot de passe:', error);
      alert('Erreur lors du changement de mot de passe');
    }
  };

  const renderField = (field: string, value: any, onChange: (val: any) => void) => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field}</label>
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch {}
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
            rows={5}
            placeholder={`Entrez ${field} au format JSON`}
          />
        </div>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field}</label>
          <textarea
            value={JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch {}
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
            rows={6}
            placeholder={`Entrez ${field} au format JSON`}
          />
        </div>
      );
    }

    if (field === 'level') {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>
      );
    }

    if (field === 'description' || field.includes('description')) {
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field}</label>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={4}
            placeholder={`Entrez ${field}`}
          />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{field}</label>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder={`Entrez ${field}`}
        />
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">🔐 Admin Access</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe admin"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-500"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header avec boutons alignés à gauche */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Key size={20} />
            Changer mot de passe
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>

        {/* Modal changement de mot de passe */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">🔑 Changer le mot de passe</h2>
              <form onSubmit={handleChangePassword}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="Au moins 6 caractères"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="Retapez le mot de passe"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {Object.entries(collections).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setEditingId(null);
                setIsAdding(false);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === key
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {value.name}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => {
            setIsAdding(true);
            setEditForm({});
          }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter un élément
        </button>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Chargement...</div>
          ) : (
            <div className="overflow-x-auto">
              {/* Mode édition/ajout en pleine largeur */}
              {(isAdding || editingId) && (
                <div className="p-6 bg-blue-50 border-b-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {isAdding ? '➕ Ajouter un nouvel élément' : '✏️ Modifier l\'élément'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {collections[activeTab as keyof typeof collections].fields.map((field) => (
                      <div key={field}>
                        {renderField(field, editForm[field], (val) =>
                          setEditForm({ ...editForm, [field]: val })
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={isAdding ? handleAdd : handleSave}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
                    >
                      <Save size={20} />
                      Enregistrer
                    </button>
                    <button
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 font-semibold"
                    >
                      <X size={20} />
                      Annuler
                    </button>
                  </div>
                </div>
              )}

              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {collections[activeTab as keyof typeof collections].fields.map((field) => (
                      <th key={field} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {field}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.map((item) => (
                    <tr key={item.id}>
                      {collections[activeTab as keyof typeof collections].fields.map((field) => (
                        <td key={field} className="px-6 py-4">
                          <span className="text-sm text-gray-900">
                            {typeof item[field] === 'object'
                              ? JSON.stringify(item[field]).substring(0, 50) + '...'
                              : String(item[field] || '-')}
                          </span>
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {data.length === 0 && !loading && !isAdding && (
          <div className="text-center py-12 text-gray-500">
            Aucune donnée. Cliquez sur "Ajouter" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
